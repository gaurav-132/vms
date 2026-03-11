import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/authService';

const TENANT_TYPES = ['School', 'Society', 'Organization', 'Office'];

export function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        orgName: '',
        type: '',
        email: '',
        password: '',
    });

    const set = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.register(form);
        authService.login({ email: form.email, role: 'Admin' });
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            {/* Brand Panel */}
            <div className="auth-page__brand">
                <div className="auth-brand__logo">
                    VMS<span>.</span>
                </div>
                <h2 className="auth-brand__title">
                    Start managing visitors in minutes
                </h2>
                <p className="auth-brand__subtitle">
                    Set up your organization workspace and invite your team. No
                    credit card required.
                </p>
                <div className="auth-brand__features">
                    {[
                        '14-day free trial on Pro plan',
                        'No credit card required',
                        'Instant onboarding',
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
                        <h2>Create Your Organization</h2>
                        <p>Get your team set up on VMS Cloud</p>
                    </div>

                    <form className="auth-card__form" onSubmit={handleSubmit}>
                        <Input
                            label="Organization Name"
                            name="orgName"
                            placeholder="Acme Corp"
                            value={form.orgName}
                            onChange={set('orgName')}
                            required
                        />

                        <div className="field">
                            <label className="field__label" htmlFor="type">
                                Organization Type
                            </label>
                            <select
                                id="type"
                                className="field__select"
                                value={form.type}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        type: e.target.value,
                                    }))
                                }
                                required
                            >
                                <option value="">Select type…</option>
                                {TENANT_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                            placeholder="Min 8 characters"
                            value={form.password}
                            onChange={set('password')}
                            required
                            helper="Use a mix of letters, numbers and symbols."
                        />

                        <div className="auth-card__submit">
                            <Button type="submit" variant="primary" size="md">
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <p className="auth-card__footer">
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
