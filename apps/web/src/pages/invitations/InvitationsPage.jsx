import React from 'react';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';

const INVITATIONS = [
    {
        invitee: 'Rohan Gupta',
        invitedBy: 'Rahul Mehta',
        date: 'Mar 11, 2026',
        expiry: 'Mar 12',
        status: 'pending',
    },
    {
        invitee: 'Lucia Romano',
        invitedBy: 'Ananya Singh',
        date: 'Mar 11, 2026',
        expiry: 'Mar 15',
        status: 'active',
    },
    {
        invitee: 'David Kim',
        invitedBy: 'Dev Patel',
        date: 'Mar 10, 2026',
        expiry: 'Mar 10',
        status: 'expired',
    },
    {
        invitee: 'Mariam Tahir',
        invitedBy: 'Meera Joshi',
        date: 'Mar 09, 2026',
        expiry: 'Mar 09',
        status: 'rejected',
    },
    {
        invitee: 'Tom Nguyen',
        invitedBy: 'Kiran Rao',
        date: 'Mar 08, 2026',
        expiry: 'Mar 10',
        status: 'active',
    },
];

const COLUMNS = [
    {
        key: 'invitee',
        label: 'Invitee',
        render: (val) => (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}
            >
                <Avatar name={val} size={32} />
                <span className="table-cell--bold">{val}</span>
            </div>
        ),
    },
    { key: 'invitedBy', label: 'Invited By' },
    { key: 'date', label: 'Date' },
    { key: 'expiry', label: 'Expiry' },
    {
        key: 'status',
        label: 'Status',
        render: (v) => <Badge variant={v}>{v}</Badge>,
    },
    {
        key: 'actions',
        label: '',
        render: (_, row) =>
            row.status === 'pending' ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="primary" size="sm">
                        Accept
                    </Button>
                    <Button variant="danger" size="sm">
                        Reject
                    </Button>
                </div>
            ) : null,
    },
];

export function InvitationsPage() {
    return (
        <div className="admin-page anim-fade-in-up">
            <div className="admin-page__header">
                <div className="admin-page__title-group">
                    <h2>Invitations</h2>
                    <small>
                        Manage all incoming and outgoing visitor invitations
                    </small>
                </div>
                <Button variant="primary" size="sm">
                    + New Invitation
                </Button>
            </div>
            <Table columns={COLUMNS} data={INVITATIONS} />
        </div>
    );
}
