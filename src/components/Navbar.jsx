import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/",        label: "Dashboard"    },
  { to: "/analysis",label: "MRI Analysis" },
  { to: "/tumors",  label: "Tumor Guide"  },
  { to: "/history", label: "History"      },
  { to: "/about",   label: "About"        },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: scrolled
          ? "rgba(2, 11, 24, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0,212,255,0.1)"
          : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* ── Logo (left) ────────────────────────────────────── */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #00d4ff22, #0096c722)",
            border: "1.5px solid rgba(0,212,255,0.45)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 14px rgba(0,212,255,0.2)",
          }}
        >
          <Brain size={18} color="#00d4ff" strokeWidth={1.75} />
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "1rem",
              color: "#e2f0ff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            NeuroScan AI
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              color: "rgba(0,212,255,0.65)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            Brain MRI Analysis
          </div>
        </div>
      </Link>

      {/* ── Nav links (right) — floating pill ──────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          background: "rgba(5, 20, 55, 0.65)",
          border: "1px solid rgba(0,212,255,0.28)",
          borderRadius: "999px",
          padding: "0.375rem 0.5rem",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
        aria-label="Primary navigation"
      >
        {navLinks.map((link) => {
          const active = link.to === "/"
            ? pathname === "/"
            : pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                position: "relative",
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                fontSize: "0.875rem",
                fontWeight: active ? 700 : 500,
                color: active ? "#061624" : "rgba(160,200,240,0.75)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                zIndex: 1,
              }}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #00d4ff, #0096c7)",
                    boxShadow: "0 0 14px rgba(0,212,255,0.5)",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
