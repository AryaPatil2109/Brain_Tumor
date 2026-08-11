import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Brain } from "lucide-react";
import MRIViewer from "../components/MRIViewer";
import TumorInfoSection from "../components/TumorInfoSection";

import { getTumor } from "../services/api";

export default function TumorDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tumor, setTumor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getTumor(slug).then((data) => {
      if (!data) setNotFound(true);
      else setTumor(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--color-blue-50)",
            borderTopColor: "var(--color-blue-600)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (notFound) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem",
        }}
      >
        <Brain size={48} color="var(--color-border)" strokeWidth={1.25} />
        <h2 style={{ marginTop: "1.25rem", color: "#e2f0ff" }}>
          Tumor not found
        </h2>
        <p style={{ color: "rgba(160,200,240,0.65)", marginBottom: "1.5rem" }}>
          No information found for "{slug}".
        </p>
        <Link to="/tumors" className="btn-primary">
          Back to Tumor Guide
        </Link>
      </div>
    );
  }

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
          <button
            onClick={() => navigate("/tumors")}
            className="btn-ghost"
            style={{ marginBottom: "0.75rem", padding: "0.375rem 0" }}
          >
            <ArrowLeft size={15} />
            Back to Tumor Guide
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background:
                  "linear-gradient(135deg, var(--color-blue-600), var(--color-teal-600))",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Brain size={24} color="#fff" strokeWidth={1.5} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-teal-600)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: "0.25rem",
                }}
              >
                {tumor.type}
              </div>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "#e2f0ff",
                  lineHeight: 1.2,
                }}
              >
                {tumor.name}
              </h1>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(160,200,240,0.65)",
                  marginTop: "0.375rem",
                }}
              >
                Brain tumor information and MRI reference
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-md" style={{ padding: "2.5rem 1.5rem" }}>
        <div
          className="tumor-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left column: MRI image + metadata */}
          <motion.div
            className="tumor-sticky-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{ position: "sticky", top: "80px" }}
          >
            <MRIViewer
              imageUrl={tumor.image}
              altText={`Representative MRI image for ${tumor.name}`}
              caption={tumor.imageCaption}
              label="MRI REFERENCE"
            />

            <div
              style={{
                background: "rgba(15,40,90,0.88)",
                borderRadius: "12px",
                border: "1px solid rgba(0,212,255,0.22)",
                boxShadow: "var(--shadow-card)",
                padding: "1.25rem",
                marginTop: "1rem",
              }}
            >
              <div style={{ marginBottom: "0.875rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "rgba(160,200,240,0.65)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.25rem",
                  }}
                >
                  Classification
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#e2f0ff",
                  }}
                >
                  {tumor.category}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "rgba(160,200,240,0.65)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.25rem",
                  }}
                >
                  Tumor Type
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#e2f0ff",
                  }}
                >
                  {tumor.type}
                </div>
              </div>
            </div>

            <Link
              to="/analysis"
              className="btn-primary"
              style={{
                marginTop: "1rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              Analyze an MRI
            </Link>
          </motion.div>

          {/* Right column: Information sections */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <TumorInfoSection title="Overview" delay={0}>
              <p>{tumor.overview}</p>
            </TumorInfoSection>

            <TumorInfoSection title="What is it?" delay={0.05}>
              <p>{tumor.whatIsIt}</p>
            </TumorInfoSection>

            <TumorInfoSection title="Key Characteristics" delay={0.1}>
              <ul
                style={{
                  paddingLeft: "0",
                  listStyle: "none",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {tumor.characteristics.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      padding: "0.625rem 0.875rem",
                      background: "#061624",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,212,255,0.22)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "var(--color-blue-600)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                      }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </TumorInfoSection>

            <TumorInfoSection title="Common Symptoms" delay={0.15}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "0.625rem",
                }}
              >
                {tumor.symptoms.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      padding: "0.625rem 0.875rem",
                      background: "rgba(6,182,212,0.07)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      color: "#e2f0ff",
                    }}
                  >
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>
                      {s.icon}
                    </span>
                    {s.label}
                  </div>
                ))}
              </div>
            </TumorInfoSection>

            <TumorInfoSection title="Diagnosis" delay={0.2}>
              <p>{tumor.diagnosis}</p>
            </TumorInfoSection>

            <TumorInfoSection title="Treatment Overview" delay={0.25}>
              <p>{tumor.treatment}</p>
            </TumorInfoSection>

            <TumorInfoSection title="MRI Appearance" delay={0.3}>
              <p>{tumor.mriAppearance}</p>
              <div
                style={{
                  marginTop: "0.875rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(0,212,255,0.07)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: "8px",
                  fontSize: "0.8375rem",
                  color: "var(--color-blue-600)",
                  fontWeight: 500,
                }}
              >
                The MRI reference image shown is a representative educational
                illustration. Actual MRI appearances vary by patient, imaging
                parameters, and tumor grade.
              </div>
            </TumorInfoSection>

            {tumor.prognosis && (
              <TumorInfoSection title="General Information" delay={0.35}>
                <p>{tumor.prognosis}</p>
              </TumorInfoSection>
            )}

            {/* Full disclaimer */}

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tumor-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            padding: 1.5rem 1rem !important;
          }
          .tumor-sticky-col {
            position: static !important;
          }
        }
      `}</style>
    </main>
  );
}
