import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import TumorCard from "../components/TumorCard";
import { getTumors } from "../services/api";

export default function TumorGuide() {
  const [tumors, setTumors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTumors().then((data) => {
      setTumors(data);
      setLoading(false);
    });
  }, []);

  const filtered = tumors.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={{ background: "#061624", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(160deg, rgba(0,100,200,0.12) 0%, #020b18 60%)",
          padding: "3rem 0 2.5rem",
          borderBottom: "1px solid rgba(0,212,255,0.22)",
        }}
      >
        <div className="container-md" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "999px",
                padding: "0.375rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-blue-600)",
                marginBottom: "1rem",
              }}
            >
              <BookOpen size={13} />
              Educational Reference
            </div>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.625rem, 4vw, 2.5rem)",
                color: "#e2f0ff",
                marginBottom: "0.875rem",
              }}
            >
              Brain Tumor Guide
            </h1>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "rgba(160,200,240,0.65)",
                maxWidth: "540px",
                margin: "0 auto 1.5rem",
                lineHeight: 1.7,
              }}
            >
              Understand the brain tumor categories classified by this AI
              system — their characteristics, MRI appearance, symptoms, and
              treatment overview.
            </p>

            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                background: "rgba(15,40,90,0.88)",
                borderRadius: "10px",
                border: "1px solid rgba(0,212,255,0.22)",
                padding: "0.625rem 1rem",
                maxWidth: "340px",
                margin: "0 auto",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Search
                size={16}
                color="var(--color-text-secondary)"
                style={{ flexShrink: 0 }}
              />
              <input
                type="text"
                placeholder="Search tumor types..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "0.9rem",
                  color: "#e2f0ff",
                  background: "transparent",
                  flex: 1,
                  fontFamily: "inherit",
                }}
                aria-label="Search tumor types"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container-md" style={{ padding: "2.5rem 1.5rem" }}>
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15,40,90,0.88)",
                  borderRadius: "16px",
                  border: "1px solid rgba(0,212,255,0.22)",
                  overflow: "hidden",
                }}
              >
                <div className="skeleton" style={{ height: "180px" }} />
                <div style={{ padding: "1.25rem" }}>
                  <div
                    className="skeleton"
                    style={{ height: "14px", width: "60%", marginBottom: "10px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "80%", marginBottom: "14px" }}
                  />
                  <div className="skeleton" style={{ height: "12px", marginBottom: "8px" }} />
                  <div
                    className="skeleton"
                    style={{ height: "12px", width: "75%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "rgba(160,200,240,0.65)",
            }}
          >
            <Search size={40} style={{ marginBottom: "1rem", opacity: 0.3 }} />
            <p>No tumor types match your search.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((tumor, i) => (
              <TumorCard key={tumor.slug} tumor={tumor} delay={i * 0.07} />
            ))}
          </div>
        )}


      </div>
    </main>
  );
}
