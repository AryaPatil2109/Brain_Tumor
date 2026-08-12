import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Mock Sign In simulation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 1rem 60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "rgba(10, 25, 55, 0.75)",
          border: "1px solid rgba(0, 212, 255, 0.15)",
          borderRadius: "20px",
          padding: "2rem 2.25rem",
          width: "100%",
          maxWidth: "440px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Side vertical accent line with pulsing glow node ── */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "10%",
            bottom: "10%",
            width: "1.5px",
            background: "linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.45), transparent)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#00d4ff",
              boxShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff",
              animation: "pulse 2s infinite ease-in-out",
            }}
          />
        </div>

        {/* ── Form Top Badge ── */}
        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "rgba(0, 212, 255, 0.85)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.75rem",
          }}
        >
          Sign In
        </div>

        {/* ── Titles ── */}
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.25,
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Welcome Back to <span style={{ color: "#00d4ff" }}>NeuroScan AI</span>
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(160, 200, 240, 0.7)",
            marginBottom: "1.25rem",
            lineHeight: 1.5,
          }}
        >
          Securely Access Your Brain MRI Analysis Portal
        </p>

        {/* ── Feedback Messages ── */}
        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              color: "#ef4444",
              fontSize: "0.875rem",
              marginBottom: "1.25rem",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              color: "#10b981",
              fontSize: "0.875rem",
              marginBottom: "1.25rem",
              fontWeight: 600,
            }}
          >
            Access authorized. Redirecting to Portal...
          </div>
        )}

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Work Email field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(160, 200, 240, 0.4)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem 0.875rem 2.75rem",
                  background: "rgba(5, 15, 35, 0.65)",
                  border: "1.5px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#e2f0ff",
                  fontSize: "0.9375rem",
                  outline: "none",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00d4ff";
                  e.target.style.boxShadow = "0 0 12px rgba(0, 212, 255, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(160, 200, 240, 0.4)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.875rem 3rem 0.875rem 2.75rem",
                  background: "rgba(5, 15, 35, 0.65)",
                  border: "1.5px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#e2f0ff",
                  fontSize: "0.9375rem",
                  outline: "none",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00d4ff";
                  e.target.style.boxShadow = "0 0 12px rgba(0, 212, 255, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(160, 200, 240, 0.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Forgot Password link */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.25rem" }}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset functionality is under development.");
                }}
                style={{
                  fontSize: "0.8125rem",
                  color: "#00d4ff",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0096c7)",
              color: "#020b18",
              padding: "0.875rem",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              border: "none",
              cursor: loading || success ? "not-allowed" : "pointer",
              transition: "transform 0.15s, box-shadow 0.2s, opacity 0.2s",
              boxShadow: "0 4px 18px rgba(0, 212, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              if (!loading && !success) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 22px rgba(0, 212, 255, 0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 4px 18px rgba(0, 212, 255, 0.3)";
            }}
          >
            {loading ? "Authorizing..." : <>Sign In <ArrowRight size={16} /></>}
          </button>
        </form>

        {/* ── Footer Link ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.875rem",
            color: "rgba(160, 200, 240, 0.6)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#00d4ff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
