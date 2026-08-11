/**
 * API Service Layer — NeuroScan AI
 *
 * All backend calls are centralized here.
 * Switch from mock data to FastAPI by setting:
 *   VITE_API_BASE_URL=http://localhost:8000
 * in frontend/.env
 *
 * Expected FastAPI endpoints:
 *   GET  /api/health
 *   GET  /api/tumors
 *   GET  /api/tumors/:slug
 *   POST /api/predict
 *   GET  /api/predictions
 *   GET  /api/predictions/:id
 */

import axios from "axios";
import { tumors, getTumorBySlug } from "../data/tumors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

// Axios instance — only used when backend is connected
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_DELAY = 800; // ms

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Mock prediction history */
const MOCK_HISTORY = [
  {
    id: "pred-001",
    date: "2025-08-10",
    filename: "brain_mri_001.jpg",
    prediction: "glioma",
    displayName: "Glioma",
    confidence: 0.932,
    model: "Hybrid CNN + Morphology",
    status: "complete",
  },
  {
    id: "pred-002",
    date: "2025-08-09",
    filename: "mri_scan_aug09.png",
    prediction: "meningioma",
    displayName: "Meningioma",
    confidence: 0.894,
    model: "Hybrid CNN + Morphology",
    status: "complete",
  },
  {
    id: "pred-003",
    date: "2025-08-07",
    filename: "test_image_003.jpg",
    prediction: "notumor",
    displayName: "No Tumor",
    confidence: 0.978,
    model: "Hybrid CNN + Morphology",
    status: "complete",
  },
  {
    id: "pred-004",
    date: "2025-08-05",
    filename: "pituitary_case.jpg",
    prediction: "pituitary",
    displayName: "Pituitary Tumor",
    confidence: 0.861,
    model: "Hybrid CNN + Morphology",
    status: "complete",
  },
  {
    id: "pred-005",
    date: "2025-08-03",
    filename: "brain_scan_ref.png",
    prediction: "glioma",
    displayName: "Glioma",
    confidence: 0.847,
    model: "Hybrid CNN + Morphology",
    status: "complete",
  },
];

/** Mock prediction result */
const MOCK_PREDICTION = (file) => ({
  id: `pred-${Date.now()}`,
  date: new Date().toISOString(),
  filename: file?.name || "uploaded_mri.jpg",
  prediction: "glioma",
  displayName: "Glioma",
  confidence: 0.932,
  model: "Hybrid CNN + Morphology",
  status: "complete",
  probabilities: [
    { class: "glioma", displayName: "Glioma", probability: 0.932 },
    { class: "meningioma", displayName: "Meningioma", probability: 0.041 },
    { class: "pituitary", displayName: "Pituitary Tumor", probability: 0.019 },
    { class: "notumor", displayName: "No Tumor", probability: 0.008 },
  ],
  gradcamAvailable: true,
  imageUrl: file ? URL.createObjectURL(file) : null,
  gradcamUrl: null, // Will be populated from FastAPI
});

// ─── Service Functions ─────────────────────────────────────────────────────────

/**
 * Health check
 * @returns {Promise<{status: string}>}
 */
export const getHealth = async () => {
  if (API_BASE_URL) {
    const res = await apiClient.get("/api/health");
    return res.data;
  }
  await sleep(MOCK_DELAY);
  return { status: "ok", mode: "mock" };
};

/**
 * Get all tumor types
 * @returns {Promise<Array>} Array of tumor objects
 */
export const getTumors = async () => {
  if (API_BASE_URL) {
    const res = await apiClient.get("/api/tumors");
    return res.data;
  }
  await sleep(MOCK_DELAY);
  return tumors;
};

/**
 * Get a single tumor by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export const getTumor = async (slug) => {
  if (API_BASE_URL) {
    const res = await apiClient.get(`/api/tumors/${slug}`);
    return res.data;
  }
  await sleep(300);
  return getTumorBySlug(slug);
};

/**
 * Submit MRI image for AI classification
 * @param {File} file - The MRI image file
 * @param {Function} onProgress - Progress callback (0–100)
 * @returns {Promise<Object>} Prediction result
 */
export const predictMRI = async (file, onProgress) => {
  if (API_BASE_URL) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiClient.post("/api/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    });
    return res.data;
  }

  // Simulate multi-step mock processing
  const steps = [20, 45, 70, 90, 100];
  for (const step of steps) {
    await sleep(500);
    if (onProgress) onProgress(step);
  }
  return MOCK_PREDICTION(file);
};

/**
 * Get all prediction history
 * @returns {Promise<Array>}
 */
export const getPredictionHistory = async () => {
  if (API_BASE_URL) {
    const res = await apiClient.get("/api/predictions");
    return res.data;
  }
  await sleep(MOCK_DELAY);
  return MOCK_HISTORY;
};

/**
 * Get a single prediction by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getPrediction = async (id) => {
  if (API_BASE_URL) {
    const res = await apiClient.get(`/api/predictions/${id}`);
    return res.data;
  }
  await sleep(300);
  return MOCK_HISTORY.find((p) => p.id === id) || null;
};

export default {
  getHealth,
  getTumors,
  getTumor,
  predictMRI,
  getPredictionHistory,
  getPrediction,
};
