import React, { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '../../../utils/fetchWithAuth';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function PortfolioPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalState, setModalState] = useState({ isOpen: false, mode: 'add', item: null });
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, itemId: null });
    
    const [formData, setFormData] = useState({ title: '', description: '', type: 'product', image_url: '', is_active: true });
    const [submitError, setSubmitError] = useState('');

    const loadItems = useCallback(() => {
        setLoading(true);
        fetchWithAuth('/api/portfolio')
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

    useEffect(() => { loadItems(); }, [loadItems]);

    const handleOpenModal = (mode, item = null) => {
        setSubmitError('');
        setModalState({ isOpen: true, mode, item });
        if (mode === 'edit' && item) {
            setFormData({ 
                title: item.title, 
                description: item.description || '', 
                type: item.type, 
                image_url: item.image_url || '', 
                is_active: item.is_active 
            });
        } else {
            setFormData({ title: '', description: '', type: 'product', image_url: '', is_active: true });
        }
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, mode: 'add', item: null });
    };

    const handleOpenConfirm = (id) => {
        setConfirmModal({ isOpen: true, itemId: id });
    };

    const handleCloseConfirm = () => {
        setConfirmModal({ isOpen: false, itemId: null });
    };

    const handleDelete = async () => {
        const id = confirmModal.itemId;
        if (!id) return;

        try {
            const res = await fetchWithAuth(`/api/portfolio/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete item');
            handleCloseConfirm();
            loadItems();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const { mode, item } = modalState;
        
        try {
            let res;
            if (mode === 'add') {
                res = await fetchWithAuth('/api/portfolio', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
            } else {
                res = await fetchWithAuth(`/api/portfolio/${item.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
            }

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Submission failed');
            }

            handleCloseModal();
            loadItems();
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    return (
        <div className="portfolio-page admin-page anim-fade-in-up">
            <header className="admin-page__header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <div className="admin-page__title-group">
                    <h2 style={{ margin: 0 }}>Products & Services</h2>
                    <small style={{ color: 'var(--clr-text-muted)' }}>Showcase your core offerings and enterprise solutions</small>
                </div>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal('add')}>+ Add Item</Button>
            </header>

            <div className="admin-page__content">
                {loading ? (
                    <div className="p-8 text-center opacity-60">Loading items...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 opacity-60">No portfolio items found.</td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="admin-table__title" style={{ fontWeight: 600 }}>
                                                    {item.title}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge--${item.type === 'product' ? 'active' : 'info'}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge badge--${item.is_active ? 'active' : 'expired'}`}>
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal('edit', item)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="ghost" size="sm" style={{ color: 'var(--clr-danger)' }} onClick={() => handleOpenConfirm(item.id)}>
                                                        Delete
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
                <Modal.Header title="Remove Item" />
                <Modal.Body>
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Remove this from portfolio?</p>
                        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>This item will no longer be visible on your public services page.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                        <Button variant="ghost" onClick={handleCloseConfirm} style={{ minWidth: '120px' }}>No, Back</Button>
                        <Button variant="danger" onClick={handleDelete} style={{ minWidth: '120px' }}>Yes, Remove</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
                <Modal.Header title={modalState.mode === 'add' ? 'Add New Product/Service' : 'Update Portfolio Item'} />
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem 0' }}>
                            {submitError && (
                                <div style={{ 
                                    padding: '0.75rem', 
                                    background: 'var(--clr-danger-soft)', 
                                    color: 'var(--clr-danger)', 
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                    {submitError}
                                </div>
                            )}
                            
                            <div className="form-group-stack">
                                <Input 
                                    label="Item Title" 
                                    value={formData.title} 
                                    onChange={e => setFormData(p => ({...p, title: e.target.value}))} 
                                    required 
                                    placeholder="e.g. Visitor Tracking System"
                                />
                            </div>
                            
                            <div className="form-group-stack">
                                <label className="input__label" style={{ 
                                    fontSize: '0.75rem', 
                                    fontWeight: 700, 
                                    color: 'var(--clr-text-muted)', 
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.5rem',
                                    display: 'block'
                                }}>
                                    Full Description
                                </label>
                                <textarea 
                                    className="field__input" 
                                    rows={4}
                                    value={formData.description} 
                                    onChange={e => setFormData(p => ({...p, description: e.target.value}))} 
                                    style={{ resize: 'vertical', width: '100%' }}
                                    placeholder="Enter detailed information about this item..."
                                />
                            </div>
                            
                            <div className="form-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label className="input__label" style={{ 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        color: 'var(--clr-text-muted)', 
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.5rem',
                                        display: 'block'
                                    }}>
                                        Category
                                    </label>
                                    <select 
                                        className="field__input" 
                                        value={formData.type} 
                                        onChange={e => setFormData(p => ({...p, type: e.target.value}))}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="product">Product</option>
                                        <option value="service">Service</option>
                                    </select>
                                </div>

                                <div className="input-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <label className="input__label" style={{ 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        color: 'var(--clr-text-muted)', 
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.5rem',
                                        display: 'block'
                                    }}>
                                        Listing Status
                                    </label>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.75rem', 
                                        marginTop: '0.25rem',
                                        padding: '0.4rem 0.75rem',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: 'var(--radius-lg)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <input 
                                            type="checkbox" 
                                            id="is_active"
                                            checked={formData.is_active} 
                                            onChange={e => setFormData(p => ({...p, is_active: e.target.checked}))} 
                                            style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer', accentColor: 'var(--clr-accent)' }}
                                        />
                                        <label htmlFor="is_active" style={{ cursor: 'pointer', margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>Visible to clients</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group-stack">
                                <Input 
                                    label="Cover Image URL" 
                                    type="url"
                                    value={formData.image_url} 
                                    onChange={e => setFormData(p => ({...p, image_url: e.target.value}))} 
                                    placeholder="https://example.com/assets/product-hero.png"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end' }}>
                            <Button type="button" variant="ghost" onClick={handleCloseModal} style={{ minWidth: '100px' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" style={{ minWidth: '140px' }}>
                                {modalState.mode === 'add' ? 'Create Listing' : 'Save Changes'}
                            </Button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
