import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
// import { useAuth } from '../../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const set = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(form.email, form.password);
            const redirectTo = location.state?.from?.pathname || '/admin';
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            {/* Brand Panel */}
            <div className="auth-page__brand">
                <div className="auth-brand__logo">
                    XYZ<span>.</span>Solutions
                </div>
                <h2 className="auth-brand__title">
                    Empowering your enterprise growth
                </h2>
                <p className="auth-brand__subtitle">
                    Sign in to manage your tech solutions,
                    analytics, and enterprise settings.
                </p>
                <div className="auth-brand__features">
                    {[
                        'Custom CRM & HRMS tools',
                        'ERP & SAP integrations',
                        'Enterprise-grade infrastructure',
                    ].map((f) => (
                        <div key={f} className="auth-brand__feature">
                            <span>✓</span>
                            <span>{f}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Panel */}
            <div className="auth-page__form">
                <div className="auth-card anim-fade-in-up">
                    <div className="auth-card__header">
                        <h2>Sign In</h2>
                        <p>Access your XYZ Solutions dashboard</p>
                    </div>

                    <form className="auth-card__form" onSubmit={handleSubmit}>
                        {error && <div style={{ color: 'var(--clr-danger)', marginBottom: '1rem' }}>{error}</div>}
                        <Input
                            label="Work Email"
                            type="email"
                            name="email"
                            placeholder="you@company.com"
                            value={form.email}
                            onChange={set('email')}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={set('password')}
                            required
                        />
                        <div className="auth-card__submit">
                            <Button type="submit" variant="primary" size="md">
                                Sign In
                            </Button>
                        </div>
                    </form>

                    <p className="auth-card__footer">
                        Looking for a solution?{' '}
                        <Link to="/book-demo">Book a Demo</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
