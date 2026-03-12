import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '../../../components/Badge';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { fetchWithAuth } from '../../../utils/fetchWithAuth';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';

const ROLE_VARIANT = {
    admin: 'admin',
    security: 'security',
    receptionist: 'info',
    employee: 'active',
};

const BASE_COLUMNS = [
    {
        key: 'name',
        label: 'User',
        render: (val, row) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Avatar name={val} size={32} />
                <div>
                    <div className="table-cell--bold">{val}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
                        {row.email}
                    </div>
                </div>
            </div>
        ),
    },
    { key: 'email', label: 'Email' },
    {
        key: 'role',
        label: 'Role',
        render: (v) => <Badge variant={ROLE_VARIANT[v] || 'active'}>{v}</Badge>,
    },
];

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modals state
    const [modalState, setModalState] = useState({ isOpen: false, mode: 'add', user: null });
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null });
    
    const [formData, setFormData] = useState({ name: '', email: '', role: 'employee', password: '' });
    const [submitError, setSubmitError] = useState('');

    const loadUsers = useCallback(() => {
        setLoading(true);
        fetchWithAuth('/api/auth/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    const handleOpenModal = (mode, user = null) => {
        setSubmitError('');
        setModalState({ isOpen: true, mode, user });
        if (mode === 'edit' && user) {
            setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        } else {
            setFormData({ name: '', email: '', role: 'employee', password: '' });
        }
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, mode: 'add', user: null });
    };

    const handleOpenConfirm = (id) => {
        setConfirmModal({ isOpen: true, userId: id });
    };

    const handleCloseConfirm = () => {
        setConfirmModal({ isOpen: false, userId: null });
    };

    const handleDelete = async () => {
        const id = confirmModal.userId;
        if (!id) return;
        
        try {
            const res = await fetchWithAuth(`/api/auth/users/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete user');
            handleCloseConfirm();
            loadUsers();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const { mode, user } = modalState;
        try {
            let res;
            if (mode === 'add') {
                res = await fetchWithAuth('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
            } else {
                const payload = { ...formData };
                if (!payload.password) delete payload.password;
                res = await fetchWithAuth(`/api/auth/users/${user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            }
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Submission failed');
            }
            handleCloseModal();
            loadUsers();
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    const COLUMNS = [
        ...BASE_COLUMNS,
        {
            key: 'actions',
            label: '',
            render: (val, row) => (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal('edit', row)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenConfirm(row.id)} style={{ color: 'var(--clr-danger)' }}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="users-page admin-page anim-fade-in-up">
            <header className="admin-page__header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <div className="admin-page__title-group">
                    <h2 style={{ margin: 0 }}>Team Management</h2>
                    <small style={{ color: 'var(--clr-text-muted)' }}>Manage your team roles and system access permissions</small>
                </div>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal('add')}>
                    + Add Member
                </Button>
            </header>

            <div className="admin-page__content">
                {loading ? (
                    <div className="p-8 text-center opacity-60">Loading team members...</div>
                ) : (
                    <div className="table-responsive">
                        <Table columns={COLUMNS} data={users} />
                    </div>
                )}
            </div>

            {/* Deletion Confirmation Modal */}
            <Modal isOpen={confirmModal.isOpen} onClose={handleCloseConfirm}>
                <Modal.Header title="Confirm Deletion" />
                <Modal.Body>
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Are you sure you want to delete this user?</p>
                        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>This action cannot be undone. All access for this user will be revoked immediately.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                        <Button variant="ghost" onClick={handleCloseConfirm} style={{ minWidth: '120px' }}>No, Cancel</Button>
                        <Button variant="danger" onClick={handleDelete} style={{ minWidth: '120px' }}>Yes, Delete</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
                <Modal.Header title={modalState.mode === 'add' ? 'Invite New Team Member' : 'Update User Access'} />
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
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                    required
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div className="form-group-stack">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                    required
                                    placeholder="john@xyzsolutions.tech"
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
                                        System Role
                                    </label>
                                    <select
                                        className="field__input"
                                        value={formData.role}
                                        onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="receptionist">Receptionist</option>
                                        <option value="security">Security</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <Input
                                        label={modalState.mode === 'add' ? 'Password' : 'New Password'}
                                        type="password"
                                        value={formData.password}
                                        onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                                        required={modalState.mode === 'add'}
                                        placeholder={modalState.mode === 'add' ? '••••••••' : 'Leave blank to keep'}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end' }}>
                            <Button type="button" variant="ghost" onClick={handleCloseModal} style={{ minWidth: '100px' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" style={{ minWidth: '120px' }}>
                                {modalState.mode === 'add' ? 'Send Invitation' : 'Save Changes'}
                            </Button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
