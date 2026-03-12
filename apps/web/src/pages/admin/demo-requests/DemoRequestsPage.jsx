import React, { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '../../../utils/fetchWithAuth';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';

export function DemoRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, requestId: null });

    const loadRequests = useCallback(() => {
        setLoading(true);
        fetchWithAuth('/api/demo-requests')
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

    useEffect(() => { loadRequests(); }, [loadRequests]);

    const handleOpenConfirm = (id) => {
        setConfirmModal({ isOpen: true, requestId: id });
    };

    const handleCloseConfirm = () => {
        setConfirmModal({ isOpen: false, requestId: null });
    };

    const handleDelete = async () => {
        const id = confirmModal.requestId;
        if (!id) return;

        try {
            const res = await fetchWithAuth(`/api/demo-requests/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete request');
            handleCloseConfirm();
            loadRequests();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await fetchWithAuth(`/api/demo-requests/${id}/status`, {
                method: 'PATCH',
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
        <div className="demo-requests-page admin-page anim-fade-in-up">
            <header className="admin-page__header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <div className="admin-page__title-group">
                    <h2 style={{ margin: 0 }}>Demo Leads</h2>
                    <small style={{ color: 'var(--clr-text-muted)' }}>Track and manage scheduled product demonstrations</small>
                </div>
            </header>

            <div className="admin-page__content">
                {loading ? (
                    <div className="p-8 text-center opacity-60">Loading demo requests...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Lead Name</th>
                                    <th>Company</th>
                                    <th>Solution</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 opacity-60">No demo requests found.</td>
                                    </tr>
                                ) : (
                                    requests.map((req) => (
                                        <tr key={req.id}>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>
                                                    {req.name}
                                                </div>
                                                <div
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
                                                {req.portfolio_items?.title || 'General Inquiry'}
                                            </td>
                                            <td>
                                                <div style={{ whiteSpace: 'nowrap' }}>
                                                    {req.created_at ? new Date(req.created_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    }) : 'N/A'}
                                                </div>
                                            </td>
                                            <td>
                                                <Badge variant={(req.status || 'New').toLowerCase().replace(' ', '-')}>
                                                    {req.status || 'New'}
                                                </Badge>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <select
                                                        value={req.status}
                                                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                                                        className="admin-select"
                                                        style={{ 
                                                            background: 'rgba(255,255,255,0.05)', 
                                                            border: '1px solid var(--clr-border)',
                                                            color: 'var(--clr-text-primary)',
                                                            borderRadius: 'var(--radius-md)',
                                                            padding: '0.25rem 0.5rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Contacted">Contacted</option>
                                                        <option value="Demo Scheduled">Scheduled</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Closed">Closed</option>
                                                    </select>
                                                    <Button variant="ghost" size="sm" onClick={() => handleOpenConfirm(req.id)} style={{ color: 'var(--clr-danger)', padding: '0.25rem' }} title="Delete Order">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Deletion Confirmation Modal */}
            <Modal isOpen={confirmModal.isOpen} onClose={handleCloseConfirm}>
                <Modal.Header title="Remove Lead" />
                <Modal.Body>
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Delete this demo request?</p>
                        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>This will permanently remove the lead from your database. This action is irreversible.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                        <Button variant="ghost" onClick={handleCloseConfirm} style={{ minWidth: '120px' }}>No, Keep</Button>
                        <Button variant="danger" onClick={handleDelete} style={{ minWidth: '120px' }}>Yes, Delete</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
