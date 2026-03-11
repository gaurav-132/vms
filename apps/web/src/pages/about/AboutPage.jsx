import React from 'react';
export function AboutPage() {
    return (
        <div className="about-page anim-fade-in-up">
            <div className="about-hero">
                <span className="section-label">About Us</span>
                <h1 style={{ marginTop: '0.5rem' }}>
                    Built for{' '}
                    <span className="gradient-text">Modern Workplaces</span>
                </h1>
                <p>
                    We're on a mission to replace paper logbooks and clunky
                    reception desks with a seamless, secure, and delightful
                    visitor experience.
                </p>
            </div>

            <div className="about-values">
                {[
                    {
                        emoji: '🎯',
                        title: 'Mission First',
                        desc: 'Every feature we ship is driven by a genuine need from our customers — not a roadmap checkbox.',
                    },
                    {
                        emoji: '🔒',
                        title: 'Security at Core',
                        desc: 'Data privacy and physical security are not afterthoughts; they are the foundation of everything we build.',
                    },
                    {
                        emoji: '⚡',
                        title: 'Speed & Simplicity',
                        desc: 'A visitor should be able to check in faster than it takes to pour a cup of coffee.',
                    },
                    {
                        emoji: '🌍',
                        title: 'Built to Scale',
                        desc: 'From a single front desk to hundreds of global offices — VMS Cloud grows with your organization.',
                    },
                ].map((v) => (
                    <div key={v.title} className="value-card">
                        <div className="value-card__emoji">{v.emoji}</div>
                        <div className="value-card__title">{v.title}</div>
                        <p>{v.desc}</p>
                    </div>
                ))}
            </div>

            <div className="about-mission">
                <span className="section-label">Our Mission</span>
                <h2 style={{ marginTop: '0.5rem' }}>
                    Making Every Arrival Memorable
                </h2>
                <p>
                    Founded in 2024, VMS Cloud helps enterprises and SMBs alike
                    to create secure, welcoming environments. We believe that
                    the first impression a visitor has of your organization
                    matters — and that impressions start at reception.
                </p>
            </div>
        </div>
    );
}
