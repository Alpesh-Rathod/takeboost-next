"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arrowRef.current;
    if (!el) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.03;
      el.style.transform = `translateY(${Math.sin(t) * 8}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&display=swap');

        :root {
          --amber: #FFA500;
          --orange: #FF6600;
          --white: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-sick-section {
          min-height: 100vh;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          position: relative;
          padding: 120px 40px;
        }

        /* LEFT PANEL */
        .hero-left {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .circle-bg {
          position: absolute;
          width: min(80vw, 780px);
          height: min(80vw, 780px);
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: rgba(255,170,0,0.35);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circlePulse 4s ease-in-out infinite;
        }

        @keyframes circlePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
        }

        .hero-headline {
          position: relative;
          z-index: 2;
          font-size: clamp(72px, 10vw, 130px);
          line-height: 0.92;
          color: var(--white);
          letter-spacing: 0.01em;
          text-align: left;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          font-weight: bold;
        }

        .hero-headline .line {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          overflow: hidden;
        }

        .hero-headline .line span {
          display: inline-block;
          animation: revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-headline .line:nth-child(1) span { animation-delay: 0.1s; }
        .hero-headline .line:nth-child(2) span { animation-delay: 0.2s; }
        .hero-headline .line:nth-child(3) span { animation-delay: 0.3s; }
        .hero-headline .line:nth-child(4) span { animation-delay: 0.4s; }
        .hero-headline .line:nth-child(5) span { animation-delay: 0.5s; }

        @keyframes revealUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .emoji {
          font-size: clamp(52px, 7vw, 96px);
          display: inline-block;
          animation: emojiPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
          line-height: 1;
        }

        @keyframes emojiPop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        /* DIVIDER ARROW */
        .divider {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          padding-top: 32px;
        }

        .divider-line {
          width: 1px;
          height: 180px;
          background: rgba(255,255,255,0.5);
        }

        .divider-arrow {
          color: rgba(255,255,255,0.8);
          margin-top: 8px;
          font-size: 20px;
        }

        /* RIGHT PANEL */
        .hero-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 60px 60px 80px;
          animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          margin-left: 20%;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
        }

        .right-headline {
          font-size: clamp(44px, 5vw, 74px);
          line-height: 0.95;
          color: var(--white);
          letter-spacing: 0.01em;
          margin-bottom: 28px;
          font-weight: 600;
        }

        .right-body {
          font-size: clamp(15px, 1.4vw, 24px);
          line-height: 1.65;
          color: rgba(255,255,255, 1);
          font-weight: 400;
          max-width: 380px;
          margin-bottom: 48px;
          font-weight: 600;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .hero-left { padding: 80px 24px 40px; }
          .hero-right { padding: 40px 24px 60px; }
          .divider { display: none; }
          .circle-bg { width: 90vw; height: 90vw; }
        }
      `}</style>

      <section className="hero-sick-section">

        {/* Divider */}
        <div className="divider">
          <div className="divider-line" />
          <div className="divider-arrow" ref={arrowRef}>↓</div>
        </div>

        {/* Left */}
        <div className="hero-left">
          <div className="circle-bg" />
          <h1 className="hero-headline">
            <div className="line"><span>STAY</span></div>
            <div className="line">
              <span>SICK</span>
              <span className="emoji">👍</span>
            </div>
            <div className="line">
              <span className="emoji">🤧</span>
              <span>NOT</span>
            </div>
            <div className="line"><span>SICK</span></div>
          </h1>
        </div>

        {/* Right */}
        <div className="hero-right">
          <p className="eyebrow">Boost helps you get sick less</p>
          <h2 className="right-headline">
            BE PROACTIVE<br />
            NOT REACTIVE<br />
            ABOUT YOUR<br />
            IMMUNITY
          </h2>
          <p className="right-body">
            No one gives a f*ck about their immune system unless they
            have to…and it took us a pandemic to realize that.
            BOOST is here to fix that.
          </p>
          <button className="cta-btn">
            <span><a href="#">BUY BOOST</a></span>
          </button>
        </div>

      </section>
    </>
  );
}