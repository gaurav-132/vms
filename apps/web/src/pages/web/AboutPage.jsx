import React from 'react';
export function AboutPage() {
    return (
        <div className="about-page anim-fade-in-up">
            <div className="about-hero">
                <span className="section-label">About Us</span>
                <h1 style={{ marginTop: '0.5rem' }}>
                    Pioneering{' '}
                    <span className="gradient-text">Enterprise Technology</span>
                </h1>
                <p>
                    XYZ Solutions is dedicated to empowering businesses with
                    cutting-edge software, from robust CRM and HRMS systems to
                    seamless ERP integrations and cloud consultancy.
                </p>
            </div>

            <div className="about-values">
                {[
                    {
                        emoji: '🚀',
                        title: 'Innovation First',
                        desc: 'We stay ahead of the curve, bringing the latest tech advancements to your business infrastructure.',
                    },
                    {
                        emoji: '🤝',
                        title: 'Partnership Driven',
                        desc: 'We don\'t just provide software; we become your long-term technology partners in growth.',
                    },
                    {
                        emoji: '⚙️',
                        title: 'Precision Engineering',
                        desc: 'Every system we build is engineered for high performance, reliability, and ease of use.',
                    },
                    {
                        emoji: '🌍',
                        title: 'Scalability at Scale',
                        desc: 'Our solutions are built to grow with you, from thriving startups to global enterprise operations.',
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
                    Simplifying Complexity Through Technology
                </h2>
                <p>
                    Founded in 2024, XYZ Solutions helps organizations navigate
                    the digital landscape with ease. We believe that technology
                    should be an enabler, not a hurdle, and we work tirelessly
                    to deliver solutions that drive real business value.
                </p>
            </div>

            {/* ── Our Journey ── */}
            <div className="about-journey spacing-lg" style={{ marginTop: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-label">Our Journey</span>
                    <h2 style={{ marginTop: '0.5rem' }}>The Evolution of Excellence</h2>
                </div>
                <div className="timeline" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--clr-accent)', opacity: 0.2, transform: 'translateX(-50%)' }}></div>
                    {[
                        { year: '2024 Q1', title: 'The Foundation', desc: 'XYZ Solutions was born from a vision to simplify enterprise software.' },
                        { year: '2024 Q2', title: 'First 50 Clients', desc: 'Rapid adoption of our Custom CRM and HRMS tools across Asia.' },
                        { year: '2024 Q3', title: 'SAP Partnership', desc: 'Became an official integration partner for major ERP ecosystems.' },
                        { year: '2024 Q4', title: 'Global Expansion', desc: 'Opened offices in 3 continents to support our growing 200+ clients.' }
                    ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', width: '100%', marginBottom: '3rem', position: 'relative' }}>
                            <div style={{ width: '45%', padding: '2rem', background: 'var(--clr-bg-secondary)', borderRadius: 'var(--radius-lg)', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                                <div style={{ color: 'var(--clr-accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{step.year}</div>
                                <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-secondary)' }}>{step.desc}</p>
                            </div>
                            <div style={{ position: 'absolute', left: '50%', top: '2rem', width: '12px', height: '12px', background: 'var(--clr-accent)', borderRadius: '50%', transform: 'translateX(-50%)', border: '4px solid var(--clr-bg-primary)' }}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Leadership ── */}
            <div className="about-leadership spacing-lg" style={{ marginTop: '5rem', paddingBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-label">Our Leadership</span>
                    <h2 style={{ marginTop: '0.5rem' }}>The Minds Behind the Tech</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    {[
                        { name: 'Saurav Sharma', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years in enterprise architecture.' },
                        { name: 'Gaibhav Gupta', role: 'CTO', bio: 'Expert in cloud-native systems and scalable infrastructure.' },
                        { name: 'Priya Verma', role: 'Head of Product', bio: 'Passion for user-centric design and business efficiency.' }
                    ].map(person => (
                        <div key={person.name} className="leader-card glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '100px', height: '100px', background: 'var(--clr-accent-soft)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👤</div>
                            <h3 style={{ marginBottom: '0.25rem' }}>{person.name}</h3>
                            <div style={{ color: 'var(--clr-accent)', fontWeight: '500', marginBottom: '1rem', fontSize: '0.9rem' }}>{person.role}</div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-secondary)' }}>{person.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
