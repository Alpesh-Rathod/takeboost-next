"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const INGREDIENTS = [
  {
    id: "elderberry",
    name: "ELDERBERRY",
    image: "/img/elderberries.png",
    bg: "transparent",       // use page gradient
    accentText: "#ffffff",
    dosage: "BOOST has 150mg of Elderberry Extract per serving",
    benefits: [
      "Provides Major Cold and Flu Relief",
      "Alleviates Sinus Infections",
      "Encourages Healthy Skin",
      "Reduces Inflammation",
    ],
    // positions from screenshot: top left blurry, top right sharp, bottom left sharp, bottom right blurry
    imgPositions: [
      { top: "-10%", left: "5%", width: "28%", blur: 12, scale: 1, rotate: -5 },
      { top: "-10%", right: "2%", width: "26%", blur: 0, scale: 1.1, rotate: 20 },
      { bottom: "-15%", left: "5%", width: "32%", blur: 0, scale: 1, rotate: 10 },
      { bottom: "-15%", right: "15%", width: "24%", blur: 10, scale: 1, rotate: -15 },
    ],
  },
  {
    id: "vitaminc",
    name: "VITAMIN C",
    image: "/img/orange.png",
    bg: "#7C3AED",           // purple
    accentText: "#ffffff",
    dosage: "BOOST has 100mg of Vitamin C per serving",
    benefits: [
      "Improves Common Cold Symptoms",
      "Holds Antioxidant Properties",
      "Promotes Glowing Skin",
      "Enhances Brain Function",
    ],
    imgPositions: [
      { top: "-8%", left: "-6%", width: "32%", blur: 0, scale: 1, rotate: -20 },
      { top: "-5%", right: "-4%", width: "28%", blur: 0, scale: 0.9, rotate: 15 },
      { bottom: "-8%", left: "20%", width: "26%", blur: 0, scale: 1, rotate: 30 },
      { bottom: "-6%", right: "5%", width: "20%", blur: 0, scale: 0.8, rotate: -10 },
    ],
  },
  {
    id: "zinc",
    name: "ZINC",
    image: "/img/zinc.png",
    bg: "#E8E4F4",           // very light lavender
    accentText: "#1a1a2e",
    dosage: "BOOST has 10mg of Zinc per serving",
    benefits: [
      "Acts as a Powerful Antioxidant",
      "Helps Balance Hormones",
      "Maintains Heart Health",
      "Aids in Digestion",
    ],
    imgPositions: [
      { top: "-10%", left: "5%", width: "28%", blur: 12, scale: 1, rotate: -5 },
      { top: "-10%", right: "2%", width: "26%", blur: 0, scale: 1.1, rotate: 20 },
      { bottom: "-15%", left: "5%", width: "32%", blur: 0, scale: 1, rotate: 10 },
      { bottom: "-15%", right: "15%", width: "24%", blur: 10, scale: 1, rotate: -15 },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function IngredientsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".ingredient-panel");
    const rightPanels = gsap.utils.toArray<HTMLElement>(".panel-content");
    const totalSections = sections.length;

    sections.forEach((panel, i) => {
      const images = panel.querySelectorAll<HTMLElement>(".ing-img");
      const rightPanel = rightPanels[i];
      const benefits = rightPanel ? rightPanel.querySelectorAll<HTMLElement>(".benefit-item") : [];
      const dosage = rightPanel ? rightPanel.querySelector<HTMLElement>(".ing-dosage") : null;

      // ── Enter animation (images fly in from corners) ──
      const enterTl = gsap.timeline({ paused: true });

      images.forEach((img, idx) => {
        const fromX = idx % 2 === 0 ? -120 : 120;
        const fromY = idx < 2 ? -100 : 100;
        enterTl.fromTo(
          img,
          { x: fromX, y: fromY, opacity: 0, scale: 0.6 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
          idx * 0.1
        );
      });

      benefits.forEach((b, idx) => {
        enterTl.fromTo(
          b,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          0.2 + idx * 0.08
        );
      });

      if (dosage) {
        enterTl.fromTo(
          dosage,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.5
        );
      }

      // ── ScrollTrigger to play enter on this panel ──
      ScrollTrigger.create({
        trigger: panel,
        start: "top 70%",
        onEnter: () => enterTl.play(0),
        onLeaveBack: () => enterTl.reverse(),
      });

      // ── Floating idle animation for images ──
      images.forEach((img, idx) => {
        gsap.to(img, {
          y: `+=${10 + idx * 4}`,
          x: `+=${idx % 2 === 0 ? -6 : 6}`,
          rotation: `+=${2}`,
          duration: 2.5 + idx * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.3,
        });
      });
    });

    // ── Active ingredient highlight driven by scroll ──
    const labelEls = gsap.utils.toArray<HTMLElement>(".ing-label");

    if (wrapperRef.current) {
      wrapperRef.current.setAttribute("data-active", INGREDIENTS[0].id);
    }

    sections.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => {
          labelEls.forEach((el, j) => {
            el.classList.toggle("active", j === i);
          });
          rightPanels.forEach((el, j) => {
            el.classList.toggle("active", j === i);
          });
          if (wrapperRef.current) {
            wrapperRef.current.setAttribute("data-active", INGREDIENTS[i].id);
          }
        },
        onEnterBack: () => {
          labelEls.forEach((el, j) => {
            el.classList.toggle("active", j === i);
          });
          rightPanels.forEach((el, j) => {
            el.classList.toggle("active", j === i);
          });
          if (wrapperRef.current) {
            wrapperRef.current.setAttribute("data-active", INGREDIENTS[i].id);
          }
        },
      });
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="ingredients-wrapper">
      {/* ── Sticky left nav — confined to wrapper ── */}
      <div className="sticky-wrapper" aria-hidden="true">
        <div className="sticky-nav">
          <p className="nav-label">INGREDIENTS</p>
          {INGREDIENTS.map((ing, i) => (
            <span key={ing.id} className={`ing-label ${i === 0 ? "active" : ""}`}>
              {ing.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Sticky right content — confined to wrapper ── */}
      <div className="sticky-wrapper-right">
        <div className="sticky-nav-right">
          {INGREDIENTS.map((ing, i) => (
            <div
              key={ing.id}
              className={`panel-content ${i === 0 ? "active" : ""}`}
              style={{
                "--accent": ing.accentText,
                "--accent-08": ing.accentText === "#1a1a2e" ? "rgba(30,20,60,0.8)" : "rgba(255,255,255,0.9)",
                "--accent-09": ing.accentText === "#1a1a2e" ? "rgba(30,20,60,0.9)" : "rgba(255,255,255,1)",
                "--border-color": ing.accentText === "#1a1a2e" ? "rgba(30,20,60,0.4)" : "rgba(255,255,255,0.7)"
              } as React.CSSProperties}
            >
              <p className="benefits-label">BENEFITS OF {ing.name}</p>
              <ul className="benefits-list">
                {ing.benefits.map((b, bi) => (
                  <li key={bi} className="benefit-item">
                    <span className="benefit-num">0{bi + 1}. </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="ing-dosage">{ing.dosage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Each ingredient panel ── */}
      {INGREDIENTS.map((ing, i) => (
        <section
          key={ing.id}
          className="ingredient-panel"
          style={{ "--bg": ing.bg, "--accent": ing.accentText } as React.CSSProperties}
        >
          {/* Floating images */}
          {ing.imgPositions.map((pos, pi) => (
            <img
              key={pi}
              src={ing.image}
              alt={ing.name}
              className="ing-img"
              style={{
                position: "absolute",
                width: pos.width,
                top: (pos as any).top,
                bottom: (pos as any).bottom,
                left: (pos as any).left,
                right: (pos as any).right,
                filter: pos.blur ? `blur(${pos.blur}px)` : undefined,
                transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 2,
              }}
            />
          ))}
        </section>
      ))}

      <style>{`
        .ingredients-wrapper {
          position: relative;
          padding: 100px 0 0;
        }

        /* ── Sticky left labels ── */
        .sticky-wrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 50%;
          pointer-events: none;
          z-index: 100;
        }
        .sticky-nav {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 40px;
          gap: 4px;
        }
        .nav-label {
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.9);
          margin-bottom: 12px;
          font-weight: 700;
          transition: color 0.5s ease;
        }
        .ing-label {
          display: block;
          font-size: clamp(3rem, 7vw, 7rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0em;
          line-height: 0.9;
          color: transparent;
          /* outlined style when inactive */
          -webkit-text-stroke: 1.5px rgba(255,255,255,1);
          transition: color 0.5s ease, -webkit-text-stroke 0.5s ease;
        }
        .ing-label.active {
          color: rgba(255,255,255,1);
          -webkit-text-stroke: 0px;
        }

        /* ── Panels ── */
        .ingredient-panel {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 60px clamp(32px, 8vw, 120px);
          transition: background-color 0.8s ease;
        }

        /* ── Sticky right content ── */
        .sticky-wrapper-right {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 40px;
          width: 50%;
          pointer-events: none;
          z-index: 50;
        }
        .sticky-nav-right {
          position: sticky;
          top: 0;
          height: 100vh;
        }

        /* ── Right content panel ── */
        .panel-content {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: clamp(32px, 8vw, 120px);
          width: clamp(320px, 40%, 500px);
          color: var(--accent);
          pointer-events: auto;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .panel-content.active {
          opacity: 1;
          visibility: visible;
        }
        .benefits-label {
          font-size: 11px;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
          color: var(--accent-08);
          font-weight: 700;
        }
        .benefits-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .benefit-item {
          display: flex;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-color);
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-weight: 600;
          color: var(--accent);
          opacity: 0; /* animated in */
        }
        .benefit-num {
          font-size: 1em;
          margin-right: 6px;
          flex-shrink: 0;
          font-weight: 600;
        }
        .ing-dosage {
          margin-top: 24px;
          font-size: 0.8rem;
          color: var(--accent-09);
          font-weight: 500;
          letter-spacing: 0.01em;
          opacity: 0; /* animated in */
        }

        /* ── Dynamic Colors for Zinc Section ── */
        .ingredients-wrapper[data-active="zinc"] .nav-label {
          color: #1a1a2e;
        }
        .ingredients-wrapper[data-active="zinc"] .ing-label {
          -webkit-text-stroke: 1.5px rgba(26, 26, 46, 0.4);
        }
        .ingredients-wrapper[data-active="zinc"] .ing-label.active {
          color: #1a1a2e;
          -webkit-text-stroke: 0px;
        }
       

        /* ── Scroll progress dot (decorative, center) ── */
        .ingredient-panel::after {
          display: none;
        }
      `}</style>
    </div>
  );
}