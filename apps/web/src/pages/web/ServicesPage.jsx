import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/products.css';

export function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/portfolio?type=service')
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="services-page">
            <header className="page-header text-center">
                <h1>Our Services</h1>
                <p>
                    Expert consulting and development to accelerate your growth.
                </p>
            </header>

            <section className="container spacing-lg">
                <div className="portfolio-grid">
                    {loading ? (
                        <div className="loading-state">Loading services...</div>
                    ) : services.length === 0 ? (
                        <div className="empty-state">
                            Check back later for new services.
                        </div>
                    ) : (
                        services.map((service) => (
                            <div
                                key={service.id}
                                className="portfolio-card glass-panel"
                            >
                                <div className="portfolio-card__icon">
                                    <span
                                        className={`icon-${service.icon_name || 'settings'}`}
                                    />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>

                                {service.features &&
                                    service.features.length > 0 && (
                                        <ul className="portfolio-card__features">
                                            {service.features.map(
                                                (feat, idx) => (
                                                    <li key={idx}>
                                                        <span className="check-icon">
                                                            ✓
                                                        </span>
                                                        {feat}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}

                                <div className="portfolio-card__action">
                                    <Link
                                        to={`/book-demo?service=${encodeURIComponent(service.id)}`}
                                        className="btn btn--primary"
                                    >
                                        Book Demo
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
