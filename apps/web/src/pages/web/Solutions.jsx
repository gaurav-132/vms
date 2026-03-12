import React from 'react';
import '../../styles/pages/home.css';

export function Solutions() {

    const FEATURES = [
        {
            icon: '💼',
            title: 'Custom CRM Solutions',
            desc: 'Tailored Customer Relationship Management systems to streamline your sales and support pipelines.',
            features: ['Lead Tracking', 'Pipeline Management', 'Automated Reporting', 'Client Portals']
        },
        {
            icon: '👥',
            title: 'Enterprise HRMS',
            desc: 'Complete Human Resource Management Systems for payroll, attendance, and employee lifecycle management.',
            features: ['Payroll Automation', 'Attendance Tracking', 'Performance Reviews', 'Self-Service Portal']
        },
        {
            icon: '🚛',
            title: 'SAP & ERP Integration',
            desc: 'Seamless integration of SAP and other ERP solutions into your existing business workflows.',
            features: ['Real-time Sync', 'Legacy Migration', 'Process Optimization', 'Custom Connectors']
        },
        {
            icon: '☁️',
            title: 'Cloud Consultancy',
            desc: 'Expert guidance on cloud migration, architecture, and infrastructure optimization for scalability.',
            features: ['AWS/Azure/GCP', 'Cost Optimization', 'Disaster Recovery', 'Security Audits']
        },
        {
            icon: '✅',
            title: 'Task Management',
            desc: 'Advanced project and task tracking tools to boost team productivity and collaboration.',
            features: ['Kanban Boards', 'Time Tracking', 'Resource Allocation', 'Gantt Charts']
        },
        {
            icon: '🔐',
            title: 'Cybersecurity & Compliance',
            desc: 'Robust security frameworks and compliance-ready solutions to protect your enterprise data.',
            features: ['SOC2/HIPAA Ready', 'Data Encryption', 'Access Control', 'Threat Monitoring']
        },
    ];


    return (
        <div className="solutions-page container spacing-lg">
            <section className="features">
                <div className="features__header">
                    <span className="section-label">Solutions</span>
                    <h2 style={{ marginTop: '0.5rem' }}>
                        Empowering Your Digital Transformation
                    </h2>
                    <p style={{ maxWidth: '700px', margin: '1rem auto 0', color: 'var(--clr-text-secondary)' }}>
                        We provide end-to-end enterprise technology that bridges the gap between complex business challenges and efficient digital workflows.
                    </p>
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
                            <ul style={{ marginTop: '1.25rem', listStyle: 'none', padding: 0, fontSize: '0.875rem', color: 'var(--clr-accent)' }}>
                                {feat.features.map(f => (
                                    <li key={f} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '1rem' }}>•</span> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="why-us spacing-lg" style={{ marginTop: '5rem', padding: '4rem', background: 'var(--clr-bg-secondary)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    <div>
                        <span className="section-label">Why Us</span>
                        <h2 style={{ marginTop: '1rem' }}>Engineering Excellence Since 2024</h2>
                        <p style={{ marginTop: '1.5rem', color: 'var(--clr-text-secondary)' }}>
                            Our solutions are not just off-the-shelf products. We engineer them to fit your specific organizational DNA, ensuring long-term scalability and security.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {[
                            { title: 'Global Standards', desc: 'Compliant with SOC2, GDPR, and HIPAA requirements.' },
                            { title: 'Rapid Deployment', desc: 'Proprietary frameworks for faster time-to-market.' },
                            { title: '24/7 Expert Support', desc: 'Direct access to engineers, not just support tickets.' }
                        ].map(item => (
                            <div key={item.title}>
                                <h4 style={{ color: 'var(--clr-accent)' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

