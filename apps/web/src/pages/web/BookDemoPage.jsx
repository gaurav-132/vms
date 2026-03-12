import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useDemoRequests } from '../../hooks/useDemoRequests';

export function BookDemoPage() {
    const [searchParams] = useSearchParams();
    const serviceParam = searchParams.get('service') || '';

    const { portfolioItems } = usePortfolio();
    const { submitDemoRequest, loading, success, error, resetStatus } = useDemoRequests();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        interested_in: serviceParam,
        preferred_demo_date: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await submitDemoRequest(formData);
        if (ok) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setFormData({
                name: '',
                email: '',
                phone: '',
                company_name: '',
                interested_in: '',
                preferred_demo_date: '',
                message: '',
            });
        }
    };

    if (success) {
        return (
            <div className="book-demo-page book-demo-page--centered anim-fade-in-up text-center">
                <div className="glass-panel success-panel" style={{ padding: '5rem 2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Demo Requested! 🎉</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                        Thank you for your interest. Our team will reach out to you shortly to schedule your personalized product walkthrough.
                    </p>
                    <button
                        className="btn btn--primary btn--lg"
                        onClick={resetStatus}
                        style={{ marginTop: '2.5rem' }}
                    >
                        Schedule Another Demo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="book-demo-page container anim-fade-in-up">
            <header className="page-header text-center">
                <span className="section-label">Book a Demo</span>
                <h1 style={{ marginTop: '0.5rem' }}>Experience the Future of VMS</h1>
                <p style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
                    Discover how our enterprise solutions can transform your organizational 
                    efficiency. Request a personalized demo today.
                </p>
            </header>

            <div className="book-demo-grid">
                {/* Left: Info */}
                <div className="book-demo-info-panel">
                    <div className="info-item">
                        <div className="info-item__icon">📍</div>
                        <div className="info-item__content">
                            <h3>Global HQ</h3>
                            <p>
                                123 Innovation Drive, Tech City<br />
                                Bangalore, KA 560001
                            </p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-item__icon">✉️</div>
                        <div className="info-item__content">
                            <h3>Direct Email</h3>
                            <p>solutions@xyzsolutions.tech</p>
                            <p>demos@xyzsolutions.tech</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-item__icon">📞</div>
                        <div className="info-item__content">
                            <h3>Sales Support</h3>
                            <p>+91 (800) 555-0199</p>
                            <p>Mon - Fri, 9am - 6pm IST</p>
                        </div>
                    </div>

                    <div className="social-links-wrapper" style={{ marginTop: '1rem' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.6 }}>CONNECT</h4>
                        <div className="social-links">
                            <a href="#" className="social-btn">𝕏</a>
                            <a href="#" className="social-btn">in</a>
                            <a href="#" className="social-btn">f</a>
                            <a href="#" className="social-btn">ig</a>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="book-demo-form-panel">
                    {error && <div className="form-error" style={{ color: 'var(--clr-error)', marginBottom: '1.5rem', fontWeight: '600' }}>{error}</div>}
                    
                    <form className="book-demo-form" onSubmit={handleSubmit}>
                        <div className="form-split">
                            <div className="field">
                                <label className="field__label">Full Name *</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    className="field__input" 
                                    placeholder="John Doe" 
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="field__label">Work Email *</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="field__input" 
                                    placeholder="john@company.com" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-split">
                            <div className="field">
                                <label className="field__label">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    className="field__input" 
                                    placeholder="+91 00000 00000" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="field__label">Company Name</label>
                                <input 
                                    type="text" 
                                    name="company_name"
                                    className="field__input" 
                                    placeholder="Acme Corp" 
                                    value={formData.company_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-split">
                            <div className="field">
                                <label className="field__label">Interested In</label>
                                <select 
                                    name="interested_in"
                                    className="field__select"
                                    value={formData.interested_in}
                                    onChange={handleChange}
                                >
                                    <option value="">General Inquiry</option>
                                    {portfolioItems.length > 0 ? (
                                        <>
                                            <optgroup label="Products">
                                                {portfolioItems
                                                    .filter((item) => item.type === 'product')
                                                    .map((it) => (
                                                        <option key={it.id} value={it.id}>{it.title}</option>
                                                    ))}
                                            </optgroup>
                                            <optgroup label="Services">
                                                {portfolioItems
                                                    .filter((item) => item.type === 'service')
                                                    .map((it) => (
                                                        <option key={it.id} value={it.id}>{it.title}</option>
                                                    ))}
                                            </optgroup>
                                        </>
                                    ) : (
                                        <>
                                            <optgroup label="Available Solutions">
                                                <option value="crm">Custom CRM Solutions</option>
                                                <option value="hrms">Enterprise HRMS</option>
                                                <option value="integration">SAP & ERP Integration</option>
                                                <option value="cloud">Cloud Consultancy</option>
                                            </optgroup>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="field">
                                <label className="field__label">Preferred Date</label>
                                <input 
                                    type="date" 
                                    name="preferred_demo_date"
                                    className="field__input"
                                    value={formData.preferred_demo_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="field__label">Message *</label>
                            <textarea
                                name="message"
                                className="field__textarea"
                                rows="4"
                                placeholder="What specific challenges are you looking to solve?"
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Request Personalized Demo'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
