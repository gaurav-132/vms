import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
    {
        icon: '🪪',
        title: 'Contactless Check-In',
        desc: 'QR-based pre-registration & instant check-in. No queues, no paperwork.',
    },
    {
        icon: '🔔',
        title: 'Real-time Notifications',
        desc: 'Hosts are instantly alerted via email or SMS the moment their guest arrives.',
    },
    {
        icon: '📊',
        title: 'Advanced Analytics',
        desc: 'Understand visitor trends and optimise front-desk operations with data.',
    },
    {
        icon: '🔐',
        title: 'Enterprise Security',
        desc: 'Role-based access control, audit trails, and compliance-ready by default.',
    },
    {
        icon: '🤝',
        title: 'Invitation Management',
        desc: 'Send digital invitations and pre-approve visitors before they arrive.',
    },
    {
        icon: '🏢',
        title: 'Multi-Location Support',
        desc: 'Manage visitor flows across multiple branches from one unified dashboard.',
    },
];

export function HomePage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="hero anim-fade-in-up">
                <div className="hero__badge">
                    🚀 Now with QR Pre-Registration
                </div>
                <h1 className="hero__title gradient-text">
                    The Smarter Way to Manage Visitors
                </h1>
                <p className="hero__subtitle">
                    Streamline check-ins, boost security, and create a welcoming
                    experience for every guest — all from one powerful
                    dashboard.
                </p>
                <div className="hero__actions">
                    <Link to="/register" className="btn btn--primary btn--lg">
                        Start Free Trial
                    </Link>
                    <Link to="/pricing" className="btn btn--secondary btn--lg">
                        View Pricing
                    </Link>
                </div>
                <div className="hero__stats">
                    <div className="stat-chip">
                        <strong>500+</strong> Organizations
                    </div>
                    <div className="stat-chip">
                        <strong>10k+</strong> Daily Check-ins
                    </div>
                    <div className="stat-chip">
                        <strong>99.9%</strong> Uptime SLA
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="features">
                <div className="features__header">
                    <span className="section-label">Features</span>
                    <h2 style={{ marginTop: '0.5rem' }}>
                        Everything You Need to Run a Tight Ship
                    </h2>
                </div>
                <div className="features__grid">
                    {FEATURES.map((feat) => (
                        <div
                            key={feat.title}
                            className="feature-card anim-fade-in-up"
                        >
                            <div className="feature-card__icon">
                                {feat.icon}
                            </div>
                            <div className="feature-card__title">
                                {feat.title}
                            </div>
                            <p className="feature-card__desc">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="steps">
                <div className="steps__header">
                    <span className="section-label">How It Works</span>
                    <h2 style={{ marginTop: '0.5rem' }}>
                        Up and Running in Minutes
                    </h2>
                </div>
                <div className="steps__grid">
                    {[
                        {
                            n: '01',
                            title: 'Register Your Organization',
                            desc: 'Create your workspace, add team members and configure your entry points.',
                        },
                        {
                            n: '02',
                            title: 'Invite & Pre-approve Visitors',
                            desc: 'Send digital invites. Visitors receive a QR pass before they even arrive.',
                        },
                        {
                            n: '03',
                            title: 'Track & Analyse',
                            desc: 'Monitor visitor traffic in real-time and review historical data on the dashboard.',
                        },
                    ].map((step) => (
                        <div key={step.n} className="step-card anim-fade-in-up">
                            <div className="step-card__number">{step.n}</div>
                            <div className="step-card__title">{step.title}</div>
                            <p className="step-card__desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA Band ── */}
            <section className="cta-band anim-fade-in-up">
                <h2>Ready to Modernise Your Reception?</h2>
                <p>
                    Join 500+ organizations already running on VMS Cloud. No
                    credit card required.
                </p>
                <Link to="/register" className="btn btn--primary btn--lg">
                    Get Started for Free
                </Link>
            </section>
        </>
    );
}
