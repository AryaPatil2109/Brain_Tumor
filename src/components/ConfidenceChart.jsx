import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  primary: "var(--color-blue-600)",
  secondary: "var(--color-teal-600)",
  dim: "#dce8f0",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        style={{
          background: "rgba(15,40,90,0.88)",
          border: "1px solid rgba(0,212,255,0.22)",
          borderRadius: "8px",
          padding: "0.625rem 0.875rem",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#e2f0ff",
            marginBottom: "0.125rem",
          }}
        >
          {d.displayName}
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--color-blue-600)", fontWeight: 600 }}>
          {(d.probability * 100).toFixed(1)}%
        </div>
      </div>
    );
  }
  return null;
};

export default function ConfidenceChart({ probabilities = [], topPrediction }) {
  const data = probabilities.map((p) => ({
    ...p,
    pct: parseFloat((p.probability * 100).toFixed(1)),
  }));

  return (
    <div>
      {/* Recharts Bar Chart */}
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 60, bottom: 0, left: 0 }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{
                fontSize: 11,
                fill: "var(--color-text-secondary)",
                fontFamily: "Inter",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="displayName"
              width={120}
              tick={{
                fontSize: 12,
                fill: "var(--color-text-primary)",
                fontFamily: "Inter",
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(23,105,170,0.04)" }} />
            <Bar dataKey="pct" radius={[0, 6, 6, 0]} isAnimationActive animationDuration={800}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.class === topPrediction
                      ? "var(--color-blue-600)"
                      : entry.class === "notumor"
                      ? "var(--color-teal-600)"
                      : COLORS.dim
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend-style rows */}
      <div style={{ marginTop: "1rem" }}>
        {data.map((row) => (
          <div
            key={row.class}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.625rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background:
                  row.class === topPrediction
                    ? "var(--color-blue-600)"
                    : row.class === "notumor"
                    ? "var(--color-teal-600)"
                    : COLORS.dim,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                flex: 1,
                fontSize: "0.875rem",
                fontWeight: row.class === topPrediction ? 700 : 400,
                color:
                  row.class === topPrediction
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
              }}
            >
              {row.displayName}
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: row.class === topPrediction ? 700 : 500,
                color:
                  row.class === topPrediction
                    ? "var(--color-blue-600)"
                    : "var(--color-text-secondary)",
                minWidth: "42px",
                textAlign: "right",
              }}
            >
              {row.pct}%
            </span>

            {/* Animated bar */}
            <div
              style={{
                flex: 2,
                height: "6px",
                background: "rgba(0,212,255,0.07)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${row.pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                style={{
                  height: "100%",
                  background:
                    row.class === topPrediction
                      ? "var(--color-blue-600)"
                      : row.class === "notumor"
                      ? "var(--color-teal-600)"
                      : COLORS.dim,
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
