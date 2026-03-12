import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
    {
        tier: 'Starter',
        monthly: 49,
        annual: 39,
        desc: 'Perfect for small offices and startups just getting started.',
        features: [
            'Up to 200 visitors/mo',
            'Email notifications',
            'QR check-in',
            'Basic analytics',
            '1 location',
        ],
        cta: 'Get Started',
        variant: 'secondary',
    },
    {
        tier: 'Professional',
        monthly: 99,
        annual: 79,
        desc: 'For growing teams that need more power and customisation.',
        features: [
            'Unlimited visitors',
            'SMS + Email alerts',
            'Custom branding',
            'Advanced analytics',
            'Up to 5 locations',
            'Priority support',
        ],
        cta: 'Start Free Trial',
        variant: 'primary',
        popular: true,
    },
    {
        tier: 'Enterprise',
        monthly: null,
        annual: null,
        desc: 'Custom solutions for large organizations and multi-site deployments.',
        features: [
            'Unlimited locations',
            'SSO / SAML integration',
            'API access',
            'Dedicated success manager',
            'SLA guarantee',
            'Custom contracts',
        ],
        cta: 'Contact Sales',
        variant: 'secondary',
    },
];

export function PricingPage() {
    const [annual, setAnnual] = useState(false);

    return (
        <div className="pricing-page anim-fade-in-up">
            <div className="pricing-page__header">
                <span className="section-label">Pricing</span>
                <h1 style={{ marginTop: '0.5rem' }}>
                    Simple, Transparent Pricing
                </h1>
                <p>No hidden fees. Cancel anytime.</p>
            </div>

            <div className="pricing-toggle">
                <span>Monthly</span>
                <div
                    className={`pricing-toggle__switch${annual ? ' annual' : ''}`}
                    onClick={() => setAnnual(!annual)}
                    role="switch"
                    aria-checked={annual}
                    tabIndex={0}
                />
                <span>
                    Annual{' '}
                    <strong
                        style={{
                            color: 'var(--clr-success)',
                            fontSize: '0.78rem',
                        }}
                    >
                        Save 20%
                    </strong>
                </span>
            </div>

            <div className="pricing-cards">
                {PLANS.map((plan) => (
                    <div
                        key={plan.tier}
                        className={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}`}
                    >
                        {plan.popular && (
                            <div className="pricing-card__popular-badge">
                                ✦ Most Popular
                            </div>
                        )}
                        <div className="pricing-card__tier">{plan.tier}</div>
                        <div className="pricing-card__price">
                            {plan.monthly === null ? (
                                'Custom'
                            ) : (
                                <>
                                    <sup>$</sup>
                                    {annual ? plan.annual : plan.monthly}
                                    <span>/mo</span>
                                </>
                            )}
                        </div>
                        <p className="pricing-card__desc">{plan.desc}</p>
                        <div className="pricing-card__divider" />
                        <ul className="pricing-card__features">
                            {plan.features.map((f) => (
                                <li key={f} className="pricing-feature">
                                    <span className="pricing-feature__check">
                                        ✓
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/register"
                            className={`btn btn--${plan.variant} btn--md`}
                        >
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
