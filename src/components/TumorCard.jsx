import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Brain } from "lucide-react";

export default function TumorCard({ tumor, delay = 0 }) {
  const {
    slug,
    name,
    shortDescription,
    type,
    category,
    overview,
    characteristics = [],
    symptoms = [],
    image,
  } = tumor;

  const [hovered, setHovered] = useState(false);

  const accent =
    slug === "meningioma" || slug === "notumor"
      ? "var(--color-teal-600)"
      : "var(--color-blue-600)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "3/4",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.35)"
          : "0 4px 16px rgba(0,0,0,0.14)",
        transition: "box-shadow 0.3s ease",
      }}
      aria-label={`${name} — hover for information`}
    >
      {/* ── Real MRI image (fills entire card) ── */}
      {image ? (
        <img
          src={image}
          alt={`Representative MRI scan for ${name}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.5s ease, filter 0.4s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            filter: hovered ? "blur(5px) brightness(0.55)" : "blur(0px) brightness(1)",
          }}
        />
      ) : (
        /* Fallback animated placeholder if image missing */
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #0d1b2e, #0a2340)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[100, 72, 48].map((s, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 22 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: s,
                height: s * 0.82,
                border: `1px solid rgba(23,105,170,0.25)`,
                borderRadius: "50%",
              }}
            />
          ))}
          <Brain size={36} color="rgba(255,255,255,0.2)" strokeWidth={1} />
        </div>
      )}

      {/* ── Always-visible bottom gradient + name badge ── */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="default-badge"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(6,12,28,0.88) 0%, rgba(6,12,28,0.0) 55%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: accent,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              {type}
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {name}
            </div>

            {/* Hover hint pill */}
            <div
              style={{
                marginTop: "0.625rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "999px",
                padding: "0.22rem 0.65rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: accent,
                  animation: "pulse 1.8s infinite",
                }}
              />
              Hover for details
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hover overlay — slides up with all info ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hover-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(6,16,38,0.72) 0%, rgba(6,16,38,0.86) 100%)",
              backdropFilter: "blur(0px)",
              padding: "1.375rem",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                {type}
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: "0.5rem",
                }}
              >
                {name}
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {overview
                  ? overview.slice(0, 160) + (overview.length > 160 ? "…" : "")
                  : shortDescription}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, " + accent + "55, transparent)",
                marginBottom: "0.875rem",
              }}
            />

            {/* Key Characteristics */}
            {characteristics.length > 0 && (
              <div style={{ marginBottom: "0.875rem" }}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: accent,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Key Characteristics
                </div>
                {characteristics.slice(0, 4).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.375rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <ChevronRight
                      size={11}
                      color={accent}
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <span
                      style={{
                        fontSize: "0.73rem",
                        color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.45,
                      }}
                    >
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Symptoms */}
            {symptoms.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: accent,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Common Symptoms
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {symptoms.slice(0, 5).map((s, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.68rem",
                        color: "rgba(255,255,255,0.8)",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "5px",
                        padding: "0.18rem 0.45rem",
                      }}
                    >
                      <span style={{ fontSize: "0.8rem" }}>{s.icon}</span>
                      {s.label.split(" ").slice(0, 3).join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer — category badge + learn more */}
            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                  marginBottom: "0.75rem",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: accent,
                    background: accent + "18",
                    border: `1px solid ${accent}44`,
                    borderRadius: "5px",
                    padding: "0.2rem 0.55rem",
                  }}
                >
                  {category}
                </span>

                <Link
                  to={`/tumors/${slug}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#fff",
                    background: accent,
                    borderRadius: "7px",
                    padding: "0.375rem 0.75rem",
                    textDecoration: "none",
                    transition: "opacity 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  aria-label={`Learn more about ${name}`}
                >
                  Learn More
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </motion.div>
  );
}
