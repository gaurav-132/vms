import React, { useState, useEffect } from 'react';

export function DemoRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/demo-requests')
            .then((res) => res.json())
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await fetch(`/api/demo-requests/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            // Update local state
            setRequests((prev) =>
                prev.map((req) =>
                    req.id === id ? { ...req, status: newStatus } : req
                )
            );
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    return (
        <div className="demo-requests-page portfolio-page">
            <header className="portfolio-page__header">
                <h2>Demo Requests</h2>
            </header>

            <div className="portfolio-page__table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Lead Name</th>
                            <th>Company</th>
                            <th>Interested In</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">Loading requests...</td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="6">No demo requests found.</td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id}>
                                    <td>
                                        <div className="req-name">
                                            {req.name}
                                        </div>
                                        <div
                                            className="req-email"
                                            style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--clr-text-muted)',
                                            }}
                                        >
                                            {req.email}
                                        </div>
                                    </td>
                                    <td>{req.company_name}</td>
                                    <td>
                                        {req.portfolio_items?.title ||
                                            'General'}
                                    </td>
                                    <td>
                                        {new Date(
                                            req.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge--${req.status.toLowerCase().replace(' ', '-')}`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={req.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    req.id,
                                                    e.target.value
                                                )
                                            }
                                            className="admin-select"
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">
                                                Contacted
                                            </option>
                                            <option value="Demo Scheduled">
                                                Demo Scheduled
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Closed">
                                                Closed
                                            </option>
                                        </select>
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
