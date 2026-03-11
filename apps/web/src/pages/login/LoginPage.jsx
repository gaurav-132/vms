import React from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/authService';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });

    const set = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login({ email: form.email, role: 'Admin' });
        const redirectTo = location.state?.from?.pathname || '/dashboard';
        navigate(redirectTo, { replace: true });
    };

    return (
        <div className="auth-page">
            {/* Brand Panel */}
            <div className="auth-page__brand">
                <div className="auth-brand__logo">
                    VMS<span>.</span>
                </div>
                <h2 className="auth-brand__title">
                    Welcome back to your workspace
                </h2>
                <p className="auth-brand__subtitle">
                    Sign in to access your visitor management dashboard,
                    analytics, and team settings.
                </p>
                <div className="auth-brand__features">
                    {[
                        'Real-time visitor tracking',
                        'SMS & Email notifications',
                        'Enterprise-grade security',
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
                        <p>Access your VMS Cloud dashboard</p>
                    </div>

                    <form className="auth-card__form" onSubmit={handleSubmit}>
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
                        Don't have an account?{' '}
                        <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
