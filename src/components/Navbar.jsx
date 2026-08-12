import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
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
          padding: "1rem 1.25rem",
          background: scrolled || menuOpen
            ? "rgba(2, 11, 24, 0.95)"
            : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen
            ? "1px solid rgba(0,212,255,0.1)"
            : "none",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* ── Logo ─────────────────────────────────────────── */}
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

        {/* ── Desktop nav pill ─────────────────────────────── */}
        <nav
          className="nav-desktop"
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

        {/* ── Sign In (desktop) ───────────────────────────── */}
        <Link
          to="/signin"
          className="nav-desktop-signin"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #0096c7)",
            color: "#020b18",
            padding: "0.45rem 1.25rem",
            borderRadius: "999px",
            fontSize: "0.875rem",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 14px rgba(0,212,255,0.3)",
            transition: "transform 0.15s, box-shadow 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 0 20px rgba(0,212,255,0.55)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "none";
            e.target.style.boxShadow = "0 0 14px rgba(0,212,255,0.3)";
          }}
        >
          Sign In
        </Link>

        {/* ── Hamburger (mobile) ───────────────────────────── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.25)",
            borderRadius: "8px",
            padding: "0.5rem",
            color: "#00d4ff",
            cursor: "pointer",
            lineHeight: 0,
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Mobile dropdown menu ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(4, 14, 40, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(0,212,255,0.15)",
              padding: "1rem 1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
            aria-label="Mobile navigation"
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
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "#00d4ff" : "rgba(160,200,240,0.8)",
                    textDecoration: "none",
                    background: active
                      ? "rgba(0,212,255,0.08)"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(0,212,255,0.22)"
                      : "1px solid transparent",
                    transition: "background 0.15s ease",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Mobile Sign In button */}
            <Link
              to="/signin"
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#020b18",
                textDecoration: "none",
                background: "linear-gradient(135deg, #00d4ff, #0096c7)",
                textAlign: "center",
                boxShadow: "0 0 14px rgba(0,212,255,0.3)",
              }}
            >
              Sign In
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop   { display: none !important; }
          .nav-desktop-signin { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
