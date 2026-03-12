import React, { useState, useEffect } from 'react';

export function PortfolioPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from the API, replace mock when real is ready
        fetch('/api/portfolio')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="portfolio-page">
            <header className="portfolio-page__header">
                <h2>Manage Portfolio</h2>
                <button className="btn btn--primary btn--sm">Add Item</button>
            </header>

            <div className="portfolio-page__table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4">Loading items...</td>
                            </tr>
                        ) : items.length === 0 ? (
                            <tr>
                                <td colSpan="4">No portfolio items found.</td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="admin-table__title">
                                            {item.icon_name && (
                                                <span
                                                    className={`icon-${item.icon_name}`}
                                                />
                                            )}
                                            {item.title}
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge--${item.type}`}
                                        >
                                            {item.type}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge--${item.is_active ? 'active' : 'expired'}`}
                                        >
                                            {item.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn--ghost btn--sm">
                                            Edit
                                        </button>
                                        <button className="btn btn--danger btn--sm ml-2">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
