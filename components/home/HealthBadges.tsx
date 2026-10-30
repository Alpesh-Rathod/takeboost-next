"use client";

import React from "react";

const badges = ["VEGAN", "NON GMO", "NUT FREE", "GLUTEN FREE", "MADE IN USA"];

export default function HealthBadges() {
    return (
        <>
            <section className="badges-section">
                <div className="badges-left">
                    {badges.map((label, i) => (
                        <span key={i} className="badge-line">
                            {label}
                        </span>
                    ))}
                </div>

                <div className="tagline-wrapper">
                    <p className="tagline">
                        A catalyst in promoting
                        <br />
                        a health-conscious
                        <br />
                        lifestyle.
                    </p>
                </div>
            </section>

            <style jsx>{`
            .badges-section {
                background-color: #f5f1e8;
                min-height: 100vh;
                width: 100%;
                display: flex;
                align-items: flex-start;
                position: relative;
                overflow: hidden;
                padding: 80px 80px;
                margin: 0;
                box-sizing: border-box;
            }

            .badges-left {
                display: flex;
                flex-direction: column;
                padding-top: 0.6rem;
                padding-left: 0.1rem;
                flex: 1;
            }

            .badge-line {
                font-weight: 900;
                font-size: clamp(4rem, 15vw, 15rem);
                color: #0a0a0a;
                letter-spacing: -0.03em;
                line-height: 0.84;
                display: block;
                text-transform: uppercase;
                white-space: nowrap;
            }

            .tagline-wrapper {
                position: absolute;
                right: 12.5%;
                top: 50%;
                transform: translateY(-50%);
                max-width: 360px;
            }

            .tagline {
                color: #111;
                letter-spacing: .005em;
                margin: 0;
                font-size: 1.8rem;
                font-weight: 600;
                line-height: 2.4rem;
            }

            @media (max-width: 768px) {
            .badge-line {
                font-size: clamp(2.4rem, 11vw, 4rem);
            }

            .tagline-wrapper {
                display: none;
            }
        }
      `}</style>
        </>
    );
}