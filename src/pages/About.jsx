import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Database, Globe, Cpu, BrainCircuit,
  Microscope, Eye, Layers, ArrowRight,
} from "lucide-react";

/* ── Tech stack data ───────────────────────────────────────────── */
const techStack = [
  { icon: Globe,       name: "React",          desc: "Frontend UI framework",            color: "#38bdf8" },
  { icon: Cpu,         name: "FastAPI",         desc: "Backend REST API (planned)",       color: "#00d4ff" },
  { icon: Database,    name: "PostgreSQL",      desc: "Persistent and Clinici (planned)", color: "#818cf8" },
  { icon: BrainCircuit,name: "Deep Learning",  desc: "CNN-based Classification",         color: "#22d3ee" },
  { icon: Microscope,  name: "Computer Vision", desc: "Morphological feature analysis",  color: "#34d399" },
  { icon: Eye,         name: "Explainable AI",  desc: "Grad-CAM visual explanations",    color: "#a78bfa" },
  { icon: Layers,      name: "Hybrid Fusion",   desc: "Dual path feature fusion",        color: "#fb923c" },
];

/* ── Left-border section card ──────────────────────────────────── */
function SectionCard({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      style={{
        background: "rgba(10,25,60,0.80)",
        borderRadius: "14px",
        border: "1px solid rgba(0,212,255,0.18)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(0,212,255,0.06)",
        padding: "1.5rem 1.75rem",
        marginBottom: "1.25rem",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Cyan accent bar + title */}
      <h2
        style={{
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "#e2f0ff",
          marginBottom: "0.875rem",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "1.1em",
            background: "linear-gradient(180deg, #00d4ff, #22d3ee)",
            borderRadius: "2px",
            flexShrink: 0,
          }}
        />
        {title}
      </h2>
      <div
        style={{
          fontSize: "0.9rem",
          color: "rgba(180,210,240,0.78)",
          lineHeight: 1.78,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Architecture diagram ──────────────────────────────────────── */
function ArchitectureDiagram() {
  const box = (label, color = "#00d4ff", bg = "rgba(0,212,255,0.1)", glow = "rgba(0,212,255,0.2)") => (
    <div style={{
      padding: "0.55rem 1.1rem",
      background: bg,
      border: `1.5px solid ${color}55`,
      borderRadius: "8px",
      fontSize: "0.82rem",
      fontWeight: 700,
      color,
      textAlign: "center",
      whiteSpace: "nowrap",
      boxShadow: `0 0 10px ${glow}`,
    }}>
      {label}
    </div>
  );

  const arrow = () => (
    <div style={{
      display: "flex", justifyContent: "center",
      padding: "0.25rem 0",
      color: "rgba(0,212,255,0.38)",
      fontSize: "1rem",
    }}>↓</div>
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "320px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2rem" }}>
          {box("Brain MRI Image", "#c7dff7", "rgba(199,223,247,0.07)", "rgba(199,223,247,0.1)")}
        </div>
        {arrow()}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2rem" }}>
          {box("Image Preprocessing", "#38bdf8", "rgba(56,189,248,0.1)", "rgba(56,189,248,0.15)")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "0.2rem" }}>
          <div>
            {arrow()}
            {box("CNN Path", "#00d4ff", "rgba(0,212,255,0.1)", "rgba(0,212,255,0.2)")}
            {arrow()}
            {box("Deep Visual Features", "#00d4ff", "rgba(0,212,255,0.08)", "rgba(0,212,255,0.12)")}
          </div>
          <div>
            {arrow()}
            {box("Morphology Path", "#22d3ee", "rgba(34,211,238,0.1)", "rgba(34,211,238,0.2)")}
            {arrow()}
            {box("Structural Features", "#22d3ee", "rgba(34,211,238,0.08)", "rgba(34,211,238,0.12)")}
          </div>
        </div>
        {arrow()}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2rem" }}>
          {box("Feature Fusion", "#818cf8", "rgba(129,140,248,0.1)", "rgba(129,140,248,0.2)")}
        </div>
        {arrow()}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.2rem" }}>
          {box("Hybrid Model", "#a78bfa", "rgba(167,139,250,0.1)", "rgba(167,139,250,0.2)")}
        </div>
        {arrow()}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {box("Final Classification + Grad-CAM", "#10b981", "rgba(16,185,129,0.1)", "rgba(16,185,129,0.25)")}
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar card wrapper ──────────────────────────────────────── */
function SideCard({ title, children, mb = "1.25rem" }) {
  return (
    <div style={{
      background: "rgba(10,25,60,0.82)",
      borderRadius: "14px",
      border: "1px solid rgba(0,212,255,0.18)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
      padding: "1.25rem 1.35rem",
      marginBottom: mb,
      backdropFilter: "blur(14px)",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <h3 style={{
        fontWeight: 700,
        fontSize: "0.95rem",
        color: "#e2f0ff",
        marginBottom: "1rem",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function About() {
  return (
    <main style={{
      minHeight: "100vh",
      paddingTop: "80px",
      background: "#061624",
      position: "relative",
      overflow: "hidden",
      overflowX: "hidden",
    }}>
      {/* ── Neural background ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/brain_neural_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.18,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Page header ────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(160deg, rgba(0,100,200,0.1) 0%, transparent 60%)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          padding: "2.5rem 0 2rem",
        }}>
          <div className="container-md">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{
                  width: "46px", height: "46px",
                  background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(6,182,212,0.15))",
                  border: "1.5px solid rgba(0,212,255,0.4)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,212,255,0.2)",
                }}>
                  <Brain size={22} color="#00d4ff" strokeWidth={1.75} />
                </div>
                <div>
                  <h1 style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    color: "#e2f0ff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}>
                    About NeuroScan AI
                  </h1>
                  <p style={{ fontSize: "0.875rem", color: "rgba(0,212,255,0.65)", fontWeight: 500, marginTop: "0.2rem" }}>
                    Brain Tumor Dual-Path Classification System
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Body grid ──────────────────────────────────── */}
        <div className="container-md about-body-pad" style={{ padding: "2rem 1.5rem 4rem" }}>
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 310px",
              gap: "1.75rem",
              alignItems: "start",
            }}
          >

            {/* ══ LEFT: Main content ═════════════════════════ */}
            <div style={{ minWidth: 0 }}>
              <SectionCard title="Project Objective" delay={0}>
                <p>
                  NeuroScan AI is an AI-assisted brain MRI classification system
                  developed as a final-year academic research project. The system
                  classifies brain MRI images into four categories — Glioma,
                  Meningioma, Pituitary Tumor, and No Tumor — using a novel
                  dual-path deep learning architecture.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  The project aims to demonstrate how deep learning and computer
                  vision techniques can be applied to medical imaging analysis,
                  with visual explainability through Grad-CAM.
                </p>
              </SectionCard>

              <SectionCard title="AI Architecture — Dual Path System" delay={0.06}>
                <p style={{ marginBottom: "1.25rem" }}>
                  The classification system uses a dual-path architecture that
                  combines two complementary analysis approaches before making a
                  final prediction:
                </p>
                <ArchitectureDiagram />
              </SectionCard>

              <SectionCard title="CNN Analysis" delay={0.1}>
                <p>
                  The CNN path uses a deep convolutional neural network to extract
                  high-level visual features from brain MRI images. The model is
                  trained to recognize patterns in pixel intensity, spatial
                  structure, and texture that distinguish different tumor types.
                  The CNN provides rich feature representations that capture
                  complex visual characteristics not easily expressed by
                  hand-crafted rules.
                </p>
              </SectionCard>

              <SectionCard title="Morphology Analysis" delay={0.14}>
                <p>
                  The morphology path extracts structural and geometric features
                  from the MRI images using image processing techniques. These
                  features capture quantitative measures of image structure
                  including shape characteristics, texture descriptors, and
                  intensity statistics. Morphological features complement CNN
                  features by providing interpretable, domain-relevant measurements.
                </p>
              </SectionCard>

              <SectionCard title="Hybrid Feature Fusion" delay={0.18}>
                <p>
                  The outputs of the CNN path and morphology path are fused
                  together into a combined feature representation. A hybrid
                  classification model then processes this fused feature set to
                  produce the final prediction. The hybrid approach leverages the
                  complementary strengths of deep visual features and structural
                  measurements, achieving higher accuracy than either path alone.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  The current best model —{" "}
                  <strong style={{ color: "#00d4ff" }}>Hybrid V2</strong> — achieved{" "}
                  <strong style={{ color: "#10b981" }}>93.00% accuracy</strong> on an
                  independent test set of 1,600 MRI images.
                </p>
              </SectionCard>

              <SectionCard title="Explainable AI (Grad-CAM)" delay={0.22}>
                <p>
                  Grad-CAM (Gradient-weighted Class Activation Mapping) generates
                  heatmap visualizations that highlight which regions of the MRI
                  scan contributed most to the model's classification decision.
                  These visualizations provide insight into the model's behavior
                  and support model transparency — an important consideration in
                  any AI system applied to medical data.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  Grad-CAM visualizations are educational tools for understanding
                  AI model behavior and do not constitute clinical findings.
                </p>
              </SectionCard>
            </div>

            {/* ══ RIGHT: Sticky sidebar ══════════════════════ */}
            <div className="about-sidebar" style={{ position: "sticky", top: "100px", minWidth: 0, width: "100%" }}>

              {/* Technology Stack */}
              <SideCard title="Technology Stack">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {techStack.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 0.625rem",
                        borderRadius: "9px",
                        background: "rgba(0,212,255,0.04)",
                        border: "1px solid rgba(0,212,255,0.1)",
                        cursor: "default",
                        transition: "background 0.2s ease, border-color 0.2s ease",
                      }}
                      whileHover={{
                        background: "rgba(0,212,255,0.08)",
                        borderColor: "rgba(0,212,255,0.22)",
                      }}
                    >
                      <div style={{
                        width: "30px", height: "30px",
                        background: `${tech.color}18`,
                        borderRadius: "7px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${tech.color}25`,
                      }}>
                        <tech.icon size={15} color={tech.color} strokeWidth={1.75} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.8125rem", color: "#e2f0ff", lineHeight: 1.2 }}>
                          {tech.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(160,200,240,0.55)", lineHeight: 1.3, marginTop: "0.1rem" }}>
                          {tech.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SideCard>

              {/* Model Performance */}
              <SideCard title="Model Performance">
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    { label: "Hybrid V2 Accuracy", value: "93.00%", valueColor: "#10b981" },
                    { label: "Test Images",          value: "1,600+", valueColor: "#00d4ff" },
                    { label: "Classes",              value: "4",      valueColor: "#38bdf8" },
                    { label: "Architecture",         value: "Dual-Path", valueColor: "#a78bfa" },
                  ].map((m, i, arr) => (
                    <div
                      key={m.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.25rem",
                        padding: "0.625rem 0",
                        borderBottom: i < arr.length - 1 ? "1px solid rgba(0,212,255,0.08)" : "none",
                        minWidth: 0,
                      }}
                    >
                      <span style={{ fontSize: "0.8125rem", color: "rgba(160,200,240,0.6)", fontWeight: 500, flexShrink: 0 }}>
                        {m.label}
                      </span>
                      <span style={{ fontSize: "0.875rem", fontWeight: 800, color: m.valueColor, flexShrink: 0 }}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </SideCard>

              {/* CTA */}
              <Link
                to="/analysis"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  background: "linear-gradient(135deg, #00d4ff, #0096c7)",
                  color: "#020b18",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(0,212,255,0.35)",
                  transition: "box-shadow 0.2s ease, opacity 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 0 36px rgba(0,212,255,0.55)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Try the Analyzer
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </div>


    </main>
  );
}
