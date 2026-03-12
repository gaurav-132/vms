import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/products.css';

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/portfolio?type=product')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="products-page">
            <header className="page-header text-center">
                <h1>Our Products</h1>
                <p>
                    Enterprise-grade software solutions to power your business.
                </p>
            </header>

            <section className="container spacing-lg">
                <div className="portfolio-grid">
                    {loading ? (
                        <div className="loading-state">Loading products...</div>
                    ) : products.length === 0 ? (
                        <div className="empty-state">
                            Check back later for new products.
                        </div>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="portfolio-card glass-panel"
                            >
                                <div className="portfolio-card__icon">
                                    <span
                                        className={`icon-${product.icon_name || 'box'}`}
                                    />
                                </div>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>

                                {product.features &&
                                    product.features.length > 0 && (
                                        <ul className="portfolio-card__features">
                                            {product.features.map(
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
                                        to={`/book-demo?service=${encodeURIComponent(product.id)}`}
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
