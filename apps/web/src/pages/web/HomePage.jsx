import React from 'react';
import { Link } from 'react-router-dom';



export function HomePage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="hero anim-fade-in-up">
                <div className="hero__badge">
                    🚀 Leading Tech Solutions Provider
                </div>
                <h1 className="hero__title gradient-text">
                    Enterprise Tech Solutions for Modern Businesses
                </h1>
                <p className="hero__subtitle">
                    From CRM and HRMS to SAP Integration and Cloud Consultancy,
                    XYZ Solutions provides the tools you need to scale your
                    organization effectively.
                </p>
                <div className="hero__actions">
                    <Link to="/book-demo" className="btn btn--primary btn--lg">
                        Book a Free Demo
                    </Link>
                    <Link to="/services" className="btn btn--secondary btn--lg">
                        Explore Services
                    </Link>
                </div>
                <div className="hero__stats">
                    <div className="stat-chip">
                        <strong>200+</strong> Enterprise Clients
                    </div>
                    <div className="stat-chip">
                        <strong>50+</strong> Tech Solutions
                    </div>
                    <div className="stat-chip">
                        <strong>24/7</strong> Expert Support
                    </div>
                </div>
            </section>

            {/* ── Features ── */}


            {/* ── How It Works ── */}
            <section className="steps">
                <div className="steps__header">
                    <span className="section-label">Our Process</span>
                    <h2 style={{ marginTop: '0.5rem' }}>
                        Your Success, Our Technology
                    </h2>
                </div>
                <div className="steps__grid">
                    {[
                        {
                            n: '01',
                            title: 'Consultation & Discovery',
                            desc: 'We analyze your business needs and identify the perfect tech solutions for your growth.',
                        },
                        {
                            n: '02',
                            title: 'Custom Implementation',
                            desc: 'Our experts deploy and integrate the solutions seamlessly into your existing ecosystem.',
                        },
                        {
                            n: '03',
                            title: 'Scale & Support',
                            desc: 'Continuous monitoring and expert support to ensure your systems evolve with your business.',
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

            {/* ── Industries ── */}
            <section className="industries container spacing-lg">
                <div className="steps__header">
                    <span className="section-label">Industries We Serve</span>
                    <h2 style={{ marginTop: '0.5rem' }}>
                        Tailored Solutions for Every Sector
                    </h2>
                </div>
                <div className="industries__grid">
                    {[
                        { icon: '🏥', name: 'Healthcare', text: 'Secure HRMS and patient management tools.' },
                        { icon: '🏭', name: 'Manufacturing', text: 'ERP integrations for complex supply chains.' },
                        { icon: '🏫', name: 'Education', text: 'Student lifecycle and campus management.' },
                        { icon: '🏢', name: 'Real Estate', text: 'Custom CRM for lead and property tracking.' },
                        { icon: '🛒', name: 'Retail', text: 'Inventory and supply chain optimization.' },
                        { icon: '🏛️', name: 'Government', text: 'Compliance-ready secure infrastructure.' }
                    ].map(ind => (
                        <div key={ind.name} className="industry-card">
                            <div className="industry-card__emoji">{ind.icon}</div>
                            <h4>{ind.name}</h4>
                            <p>{ind.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="testimonials">
                <div className="container">
                    <div className="steps__header text-center">
                        <span className="section-label">Testimonials</span>
                        <h2 style={{ marginTop: '0.5rem' }}>Trusted by Industry Leaders</h2>
                    </div>
                    <div className="testimonials__grid">
                        {[
                            { quote: "XYZ Solutions transformed our HR processes. Their HRMS is a game changer for our global team.", author: "Sarah Chen", role: "HR Director, GlobalTech" },
                            { quote: "The SAP integration was seamless. We saw a 30% increase in efficiency within the first quarter.", author: "Marcus Thorne", role: "CTO, Industrial Corp" },
                            { quote: "Their cloud consultancy helped us scale from a startup to an enterprise without any downtime.", author: "Elena Rodriguez", role: "Founder, ScaleUp India" }
                        ].map((t, i) => (
                            <div key={i} className="testimonial-card glass-panel">
                                <div className="testimonial-card__quote-mark">"</div>
                                <p className="testimonial-card__text">{t.quote}</p>
                                <div className="testimonial-card__author">{t.author}</div>
                                <div className="testimonial-card__role">{t.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Band ── */}
            <section className="cta-band anim-fade-in-up">
                <h2>Ready to Accelerate Your Growth?</h2>
                <p>
                    Join 200+ organizations already leveraging XYZ Solutions.
                    Get a personalized demo today.
                </p>
                <Link to="/book-demo" className="btn btn--primary btn--lg">
                    Book Your Demo Now
                </Link>
            </section>
        </>
    );
}
