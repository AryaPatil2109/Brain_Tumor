import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChartBar,
  Eye,
  RotateCcw,
} from "lucide-react";
import MRIViewer from "../components/MRIViewer";
import PredictionCard from "../components/PredictionCard";
import ConfidenceChart from "../components/ConfidenceChart";
import GradCAMViewer from "../components/GradCAMViewer";


// Fallback mock for direct navigation to /results
const FALLBACK = {
  prediction: "glioma",
  displayName: "Glioma",
  confidence: 0.932,
  model: "Hybrid CNN + Morphology",
  filename: "demo_mri.jpg",
  imageUrl: null,
  gradcamUrl: null,
  probabilities: [
    { class: "glioma", displayName: "Glioma", probability: 0.932 },
    { class: "meningioma", displayName: "Meningioma", probability: 0.041 },
    { class: "pituitary", displayName: "Pituitary Tumor", probability: 0.019 },
    { class: "notumor", displayName: "No Tumor", probability: 0.008 },
  ],
};

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showGradcam, setShowGradcam] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("latestPrediction");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        setResult(FALLBACK);
      }
    } else {
      setResult(FALLBACK);
    }
  }, []);

  if (!result) return null;

  return (
    <main style={{ background: "#061624", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Page header */}
      <div
        style={{
          background:
            "linear-gradient(160deg, rgba(0,100,200,0.12) 0%, #020b18 60%)",
          padding: "2rem 0 1.5rem",
          borderBottom: "1px solid rgba(0,212,255,0.22)",
        }}
      >
        <div className="container-md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <button
                onClick={() => navigate("/analysis")}
                className="btn-ghost"
                style={{ marginBottom: "0.5rem", padding: "0.375rem 0" }}
              >
                <ArrowLeft size={15} />
                Back to Analysis
              </button>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
                  color: "#e2f0ff",
                }}
              >
                Analysis Result
              </h1>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(160,200,240,0.65)",
                  marginTop: "0.25rem",
                }}
              >
                {result.filename} · {result.model}
              </p>
            </div>
            <button
              onClick={() => navigate("/analysis")}
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <RotateCcw size={15} />
              New Analysis
            </button>
          </div>
        </div>
      </div>

      <div
        className="container-md"
        style={{ padding: "2.5rem 1.5rem" }}
      >
        {/* Main grid: MRI + Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="results-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* MRI Viewer */}
          <div
            style={{
              background: "rgba(15,40,90,0.88)",
              borderRadius: "14px",
              border: "1px solid rgba(0,212,255,0.22)",
              boxShadow: "var(--shadow-card)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "rgba(160,200,240,0.65)",
                marginBottom: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Uploaded MRI
            </div>
            <MRIViewer
              imageUrl={result.imageUrl}
              altText={`Uploaded brain MRI scan — ${result.filename}`}
              caption={result.filename}
              label="Uploaded Image"
            />
          </div>

          {/* Prediction Card */}
          <PredictionCard
            prediction={result.prediction}
            displayName={result.displayName}
            confidence={result.confidence}
            model={result.model}
          />
        </motion.div>

        {/* Probability Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            background: "rgba(15,40,90,0.88)",
            borderRadius: "14px",
            border: "1px solid rgba(0,212,255,0.22)",
            boxShadow: "var(--shadow-card)",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <ChartBar
              size={18}
              color="var(--color-blue-600)"
              strokeWidth={1.75}
            />
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#e2f0ff",
              }}
            >
              Class Probabilities
            </h2>
          </div>
          <ConfidenceChart
            probabilities={result.probabilities}
            topPrediction={result.prediction}
          />
        </motion.div>

        {/* Grad-CAM section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            background: "rgba(15,40,90,0.88)",
            borderRadius: "14px",
            border: "1px solid rgba(0,212,255,0.22)",
            boxShadow: "var(--shadow-card)",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              marginBottom: "1rem",
            }}
          >
            <Eye size={18} color="var(--color-teal-600)" strokeWidth={1.75} />
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#e2f0ff",
              }}
            >
              AI Explanation (Grad-CAM)
            </h2>
          </div>
          <GradCAMViewer
            originalUrl={result.imageUrl}
            gradcamUrl={result.gradcamUrl}
            displayName={result.displayName}
          />
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ marginBottom: "2rem" }}
        >

        </motion.div>

        {/* CTA */}
        {result.prediction && result.prediction !== "notumor" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(6,182,212,0.05))",
              borderRadius: "14px",
              border: "1px solid rgba(0,212,255,0.22)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "#e2f0ff",
                marginBottom: "0.5rem",
              }}
            >
              Want to learn more about {result.displayName}?
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(160,200,240,0.65)",
                marginBottom: "1.25rem",
              }}
            >
              View educational information about {result.displayName} including
              overview, characteristics, symptoms, and treatment overview.
            </p>
            <Link
              to={`/tumors/${result.prediction}`}
              className="btn-primary"
            >
              Learn About {result.displayName}
            </Link>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .results-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
