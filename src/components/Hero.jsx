import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Brain } from "lucide-react";

/* ── Scanning animation canvas ─────────────────────────────────── */
function ScanAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animId;

    const W = canvas.width  = 340;
    const H = canvas.height = 300;
    const cx = W / 2;
    const cy = H / 2;

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      const t = frame / 60;

      // Outer concentric rings
      const rings = [
        { r: 130, opacity: 0.12 },
        { r: 100, opacity: 0.18 },
        { r:  72, opacity: 0.22 },
        { r:  48, opacity: 0.28 },
      ];
      rings.forEach(({ r, opacity }) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Rotating arc (fast)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 2.5);
      const grad1 = ctx.createConicalGradient
        ? null
        : (() => {
            const g = ctx.createLinearGradient(-110, 0, 110, 0);
            g.addColorStop(0, "rgba(0,212,255,0)");
            g.addColorStop(1, "rgba(0,212,255,0.6)");
            return g;
          })();
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 1.2);
      ctx.strokeStyle = "rgba(0,212,255,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Rotating arc (slow, reverse)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 1.2);
      ctx.beginPath();
      ctx.arc(0, 0, 90, Math.PI * 0.3, Math.PI * 1.8);
      ctx.strokeStyle = "rgba(0,180,212,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Corner brackets
      const s = 120; // half-size of bounding box
      const bLen = 20;
      const bCorners = [
        [cx - s, cy - s, 1, 1],
        [cx + s, cy - s, -1, 1],
        [cx - s, cy + s, 1, -1],
        [cx + s, cy + s, -1, -1],
      ];
      ctx.strokeStyle = "rgba(0,212,255,0.7)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      bCorners.forEach(([x, y, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(x + dx * bLen, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dy * bLen);
        ctx.stroke();
      });

      // Scanning line
      const scanY = cy - s + ((Math.sin(t * 1.5) * 0.5 + 0.5) * s * 2);
      const scanGrad = ctx.createLinearGradient(cx - s, scanY, cx + s, scanY);
      scanGrad.addColorStop(0,   "rgba(0,212,255,0)");
      scanGrad.addColorStop(0.5, "rgba(0,212,255,0.8)");
      scanGrad.addColorStop(1,   "rgba(0,212,255,0)");
      ctx.beginPath();
      ctx.moveTo(cx - s, scanY);
      ctx.lineTo(cx + s, scanY);
      ctx.strokeStyle = scanGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center target dot
      const dotPulse = 0.6 + Math.sin(t * 3) * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${dotPulse})`;
      ctx.fill();

      // Pulsing outer dot glow
      const glowR = 12 + Math.sin(t * 3) * 4;
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glowGrad.addColorStop(0,   "rgba(0,212,255,0.3)");
      glowGrad.addColorStop(1,   "rgba(0,212,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Data points (corner dots)
      const dotPositions = [
        [cx - s, cy - s],
        [cx + s, cy - s],
        [cx - s, cy + s],
        [cx + s, cy + s],
        [cx,     cy - s],
        [cx,     cy + s],
        [cx - s, cy],
        [cx + s, cy],
      ];
      dotPositions.forEach(([x, y], i) => {
        const blink = 0.4 + Math.sin(t * 2 + i * 0.8) * 0.4;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${blink})`;
        ctx.fill();
      });

      // "BRAIN MRI + AI ANALYSIS" label
      ctx.font = "600 10px Inter, sans-serif";
      ctx.fillStyle = "rgba(0,212,255,0.45)";
      ctx.textAlign = "center";
      ctx.letterSpacing = "0.15em";
      ctx.fillText("BRAIN MRI · AI ANALYSIS", cx, H - 14);

      frame++;
      animId = requestAnimationFrame(drawFrame);
    }

    drawFrame();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={340}
      height={300}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}

/* ── Stat ring card ─────────────────────────────────────────────── */
function StatRing({ value, label, pct = 100, delay = 0 }) {
  const r  = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        background: "rgba(15,40,90,0.90)",
        border: "1px solid rgba(0,212,255,0.18)",
        borderRadius: "14px",
        padding: "1.125rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.875rem",
        backdropFilter: "blur(12px)",
        flex: 1,
        minWidth: "120px",
      }}
    >
      <svg width="68" height="68" viewBox="0 0 68 68" style={{ flexShrink: 0 }}>
        {/* Track */}
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="4" />
        {/* Progress */}
        <motion.circle
          cx="34" cy="34" r={r}
          fill="none"
          stroke="url(#statGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, delay: delay + 0.3, ease: "easeOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <defs>
          <linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0096c7" />
          </linearGradient>
        </defs>
        <text x="34" y="34" textAnchor="middle" dominantBaseline="central"
          fill="#00d4ff" fontSize="11" fontWeight="700">
          {value}
        </text>
      </svg>
      <div>
        <div style={{ fontSize: "0.75rem", color: "rgba(160,200,240,0.6)", fontWeight: 500 }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,100,180,0.12) 0%, transparent 70%), " +
          "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(0,212,255,0.05) 0%, transparent 60%), " +
          "#061624",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        top: "-100px", right: "0px", pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,100,200,0.08) 0%, transparent 70%)",
        bottom: "0px", left: "-100px", pointerEvents: "none",
      }} />

      <div className="container-md" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* ── LEFT: Text content ──────────────────────────── */}
          <div>
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: "999px",
                padding: "0.35rem 0.875rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#00d4ff",
                marginBottom: "1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#00d4ff",
                  animation: "pulse 1.8s infinite",
                  flexShrink: 0,
                }}
              />
              AI-Powered Brain MRI Analysis
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{
                fontWeight: 900,
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.1,
                color: "#e2f0ff",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              AI-Assisted{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #38bdf8, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Brain Tumor
              </span>
              {" "}Classification Through{" "}
              <span style={{ color: "#e2f0ff" }}>Deep Learning</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontSize: "1.0625rem",
                color: "rgba(160,200,240,0.75)",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              Analyze brain MRI images using an AI-assisted dual-path
              classification system combining CNN deep features and
              morphological analysis — with Grad-CAM visual explanations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
            >
              <Link to="/analysis" className="btn-primary">
                Analyze MRI
                <ArrowRight size={17} />
              </Link>
              <Link to="/tumors" className="btn-secondary">
                Explore Tumor Guide
              </Link>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <StatRing value="93%" label="Accuracy"       pct={93}  delay={0.4} />
              <StatRing value="4"   label="Tumor Classes"  pct={100} delay={0.5} />
              <StatRing value="1.6k" label="Test Images"   pct={80}  delay={0.6} />
            </motion.div>
          </div>

          {/* ── RIGHT: Floating dashboard panel ─────────────── */}
          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "rgba(15,40,90,0.88)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "20px",
                padding: "1.5rem",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.08), inset 0 1px 0 rgba(0,212,255,0.1)",
                maxWidth: "380px",
                width: "100%",
              }}
            >
              {/* Panel top: Dual-Path badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.875rem",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    borderRadius: "999px",
                    padding: "0.25rem 0.625rem",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "rgba(0,212,255,0.75)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Cpu size={10} color="#00d4ff" />
                  Dual-Path Architecture
                </div>
              </div>

              {/* Scan animation */}
              <div
                style={{
                  background: "rgba(2,10,24,0.8)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,212,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
              >
                <ScanAnimation />
              </div>

              {/* Mini stat row inside panel */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.625rem",
                }}
              >
                {[
                  { val: "93%",    label: "Accuracy",  color: "#00d4ff",  bg: "rgba(0,212,255,0.1)"  },
                  { val: "4",      label: "Classes",   color: "#38bdf8",  bg: "rgba(56,189,248,0.1)" },
                  { val: "Hybrid", label: "Model",     color: "#06b6d4",  bg: "rgba(6,182,212,0.1)"  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.color}30`,
                      borderRadius: "10px",
                      padding: "0.625rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.0625rem",
                        color: s.color,
                        lineHeight: 1.1,
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: "0.67rem",
                        color: "rgba(160,200,240,0.6)",
                        fontWeight: 500,
                        marginTop: "0.2rem",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-panel { display: none !important; }
        }
      `}</style>
    </section>
  );
}
