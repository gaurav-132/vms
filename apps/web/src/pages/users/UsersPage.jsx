import React from 'react';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';

const USERS = [
    { name: 'Rahul Mehta', email: 'rahul@acme.com', role: 'admin' },
    { name: 'Ananya Singh', email: 'ananya@acme.com', role: 'security' },
    { name: 'Dev Patel', email: 'dev@acme.com', role: 'receptionist' },
    { name: 'Meera Joshi', email: 'meera@acme.com', role: 'employee' },
    { name: 'Kiran Rao', email: 'kiran@acme.com', role: 'employee' },
    { name: 'Sagar Desai', email: 'sagar@acme.com', role: 'security' },
];

const ROLE_VARIANT = {
    admin: 'admin',
    security: 'security',
    receptionist: 'info',
    employee: 'active',
};

const COLUMNS = [
    {
        key: 'name',
        label: 'User',
        render: (val, row) => (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}
            >
                <Avatar name={val} size={32} />
                <div>
                    <div className="table-cell--bold">{val}</div>
                    <div
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--clr-text-muted)',
                        }}
                    >
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
    {
        key: 'actions',
        label: '',
        render: () => (
            <Button variant="ghost" size="sm">
                Edit
            </Button>
        ),
    },
];

export function UsersPage() {
    return (
        <div className="admin-page anim-fade-in-up">
            <div className="admin-page__header">
                <div className="admin-page__title-group">
                    <h2>User Management</h2>
                    <small>Manage team roles and access permissions</small>
                </div>
                <Button variant="primary" size="sm">
                    + Invite User
                </Button>
            </div>
            <Table columns={COLUMNS} data={USERS} />
        </div>
    );
}
