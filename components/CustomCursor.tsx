"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  // ✅ FIX 1: Track mount state so we render nothing on the server.
  //    This eliminates the SSR/client HTML mismatch that caused the
  //    hydration error, since cursor state is inherently client-only.
  const [mounted, setMounted] = useState(false);

  // ✅ FIX 2: Keep `visible` in a ref so the `onMove` handler always
  //    reads the latest value without needing to be in the dep array.
  //    Previously, having `visible` in the dep array caused every
  //    visibility change to tear down and re-register all listeners.
  const visibleRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("data-cursor-hover") !== null
      ) {
        setHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("data-cursor-hover") !== null
      ) {
        setHovering(false);
      }
    };

    const onMouseLeaveWindow = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onMouseEnterWindow = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onMouseEnterWindow);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterWindow);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // ✅ Empty deps: effect runs once on mount, no listener churn

  // ✅ Render nothing on the server — keeps SSR HTML clean
  if (!mounted) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        .cursor-ring {
          position: fixed;
          width: 30px;
          height: 30px;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 99999;
          transition:
            width 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            height 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            background 0.18s ease,
            border-color 0.18s ease,
            opacity 0.3s ease;
        }

        .cursor-ring.clicking {
          width: 26px;
          height: 26px;
          background: rgba(26, 26, 26, 0.12);
        }

        .cursor-ring.hovering {
          border: none;
          background: linear-gradient(315.01deg, #ff710d 8.31%, #ffb800 88.22%);
        }

        .cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: #1a1a1a;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 100000;
          transition:
            width 0.1s ease,
            height 0.1s ease,
            opacity 0.3s ease;
        }

        .cursor-dot.hovering {
          width: 0;
          height: 0;
          opacity: 0;
        }
      `}</style>

      <div
        ref={ringRef}
        className={`cursor-ring${clicking ? " clicking" : ""}${hovering ? " hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className={`cursor-dot${hovering ? " hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}