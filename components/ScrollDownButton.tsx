"use client";

import { useEffect, useState } from "react";

export default function ScrollDownButton({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);

    const check = () => {
      if (!target) return;
      // Ẩn khi đã scroll qua đầu section đích
      setVisible(window.scrollY < target.offsetTop - 80);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [targetId]);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Cuộn xuống xem thêm"
        style={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          borderRadius: 0,
          padding: "8px 16px",
          cursor: "pointer",
          color: "var(--muted)",
          fontSize: 11,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          fontFamily: "inherit",
          boxShadow: "none",
          opacity: visible ? 0.6 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity .4s ease, color .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        <span>Khám phá</span>
        <span
          style={{
            width: 28,
            height: 28,
            display: "grid",
            placeItems: "center",
            animation: "scrollBounce 1.8s ease-in-out infinite",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,5 7,10 12,5" />
          </svg>
        </span>
      </button>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </>
  );
}

