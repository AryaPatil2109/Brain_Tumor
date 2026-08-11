import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClockIcon, ExternalLink, Brain } from "lucide-react";
import { getPredictionHistory } from "../services/api";

function ConfidenceBadge({ confidence }) {
  const pct = (confidence * 100).toFixed(1);
  const color =
    confidence >= 0.85
      ? "var(--color-success)"
      : confidence >= 0.65
      ? "var(--color-warning)"
      : "var(--color-error)";
  const bg =
    confidence >= 0.85
      ? "#f0fdf4"
      : confidence >= 0.65
      ? "#fffbeb"
      : "#fef2f2";
  const border =
    confidence >= 0.85 ? "#bbf7d0" : confidence >= 0.65 ? "#fde68a" : "#fecaca";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.25rem 0.625rem",
        borderRadius: "999px",
        fontSize: "0.8125rem",
        fontWeight: 700,
        color,
        background: bg,
        border: `1px solid ${border}`,
      }}
      aria-label={`Confidence: ${pct}%`}
    >
      {pct}%
    </span>
  );
}

function PredictionBadge({ displayName }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 600,
        fontSize: "0.9rem",
        color: "#e2f0ff",
      }}
    >
      {displayName}
    </span>
  );
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPredictionHistory().then((data) => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  return (
    <main style={{ background: "#061624", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(160deg, rgba(0,100,200,0.12) 0%, #020b18 60%)",
          padding: "3rem 0 2rem",
          borderBottom: "1px solid rgba(0,212,255,0.22)",
        }}
      >
        <div className="container-md">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, var(--color-blue-600), var(--color-teal-600))",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ClockIcon size={20} color="#fff" />
              </div>
              <div>
                <h1
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "#e2f0ff",
                  }}
                >
                  Prediction History
                </h1>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(160,200,240,0.65)",
                  }}
                >
                  Previous MRI analysis results
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-md" style={{ padding: "2.5rem 1.5rem" }}>
        {loading ? (
          <div
            style={{
              background: "rgba(15,40,90,0.88)",
              borderRadius: "14px",
              border: "1px solid rgba(0,212,255,0.22)",
              overflow: "hidden",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom:
                    i < 3 ? "1px solid rgba(0,212,255,0.22)" : "none",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <div
                  className="skeleton"
                  style={{ width: "90px", height: "14px", borderRadius: "6px" }}
                />
                <div
                  className="skeleton"
                  style={{ width: "120px", height: "14px", borderRadius: "6px" }}
                />
                <div
                  className="skeleton"
                  style={{ width: "60px", height: "14px", borderRadius: "6px" }}
                />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              background: "rgba(15,40,90,0.88)",
              borderRadius: "14px",
              border: "1px solid rgba(0,212,255,0.22)",
            }}
          >
            <Brain
              size={48}
              color="var(--color-border)"
              style={{ marginBottom: "1.25rem" }}
              strokeWidth={1.25}
            />
            <h3
              style={{
                fontWeight: 700,
                color: "#e2f0ff",
                marginBottom: "0.5rem",
              }}
            >
              No analysis history yet
            </h3>
            <p
              style={{
                color: "rgba(160,200,240,0.65)",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              Upload an MRI scan to see your prediction history here.
            </p>
            <Link to="/analysis" className="btn-primary">
              Analyze MRI
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="history-table">
              <div
                style={{
                  background: "rgba(15,40,90,0.88)",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,212,255,0.22)",
                  boxShadow: "var(--shadow-card)",
                  overflow: "hidden",
                }}
              >
                {/* Table header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 180px 1fr 110px 110px 100px",
                    padding: "0.875rem 1.5rem",
                    background: "#061624",
                    borderBottom: "1px solid rgba(0,212,255,0.22)",
                    gap: "1rem",
                  }}
                >
                  {[
                    "Date",
                    "Filename",
                    "Prediction",
                    "Confidence",
                    "Model",
                    "Action",
                  ].map((h) => (
                    <div
                      key={h}
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "rgba(160,200,240,0.65)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Table rows */}
                {history.map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "140px 180px 1fr 110px 110px 100px",
                      padding: "1rem 1.5rem",
                      borderBottom:
                        i < history.length - 1
                          ? "1px solid rgba(0,212,255,0.22)"
                          : "none",
                      gap: "1rem",
                      alignItems: "center",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#061624")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(160,200,240,0.65)",
                      }}
                    >
                      {row.date}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#e2f0ff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={row.filename}
                    >
                      {row.filename}
                    </div>
                    <div>
                      <PredictionBadge displayName={row.displayName} />
                    </div>
                    <div>
                      <ConfidenceBadge confidence={row.confidence} />
                    </div>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        color: "rgba(160,200,240,0.65)",
                      }}
                    >
                      Hybrid
                    </div>
                    <div>
                      <Link
                        to="/results"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-blue-600)",
                          textDecoration: "none",
                        }}
                        aria-label={`View result for ${row.filename}`}
                      >
                        View
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile cards */}
            <div className="history-cards" style={{ display: "none" }}>
              {history.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: "rgba(15,40,90,0.88)",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,212,255,0.22)",
                    boxShadow: "var(--shadow-card)",
                    padding: "1.125rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div>
                      <PredictionBadge displayName={row.displayName} />
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "rgba(160,200,240,0.65)",
                          marginTop: "0.25rem",
                        }}
                      >
                        {row.date}
                      </div>
                    </div>
                    <ConfidenceBadge confidence={row.confidence} />
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(160,200,240,0.65)",
                      marginBottom: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.filename}
                  </div>
                  <Link to="/results" className="btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem" }}>
                    View Result <ExternalLink size={13} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}


      </div>

      <style>{`
        @media (max-width: 768px) {
          .history-table { display: none !important; }
          .history-cards { display: block !important; }
        }
      `}</style>
    </main>
  );
}
