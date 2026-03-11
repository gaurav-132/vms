import React from 'react';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';

const VISITORS = [
    {
        name: 'Priya Sharma',
        host: 'Rahul Mehta',
        purpose: 'Meeting',
        time: 'Today, 10:30 AM',
        status: 'active',
    },
    {
        name: 'James Wilson',
        host: 'Ananya Singh',
        purpose: 'Interview',
        time: 'Today, 11:00 AM',
        status: 'active',
    },
    {
        name: 'Sara Khan',
        host: 'Dev Patel',
        purpose: 'Delivery',
        time: 'Today, 09:15 AM',
        status: 'expired',
    },
    {
        name: 'Carlos Rivera',
        host: 'Meera Joshi',
        purpose: 'Visit',
        time: 'Today, 08:45 AM',
        status: 'active',
    },
    {
        name: 'Emily Chen',
        host: 'Kiran Rao',
        purpose: 'Meeting',
        time: 'Yesterday, 3pm',
        status: 'expired',
    },
    {
        name: 'Ali Hassan',
        host: 'Sagar Desai',
        purpose: 'Training',
        time: 'Yesterday, 1pm',
        status: 'rejected',
    },
    {
        name: 'Fatima Noor',
        host: 'Lakshmi Iyer',
        purpose: 'Conference',
        time: 'Mar 10, 10am',
        status: 'active',
    },
];

const COLUMNS = [
    {
        key: 'name',
        label: 'Visitor',
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
    { key: 'host', label: 'Host' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'time', label: 'Check-in Time' },
    {
        key: 'status',
        label: 'Status',
        render: (v) => <Badge variant={v}>{v}</Badge>,
    },
    {
        key: 'actions',
        label: '',
        render: (_, row) => (
            <Button variant="ghost" size="sm">
                View
            </Button>
        ),
    },
];

export function VisitorsPage() {
    return (
        <div className="admin-page anim-fade-in-up">
            <div className="admin-page__header">
                <div className="admin-page__title-group">
                    <h2>Visitors</h2>
                    <small>Track and manage all visitor check-ins</small>
                </div>
                <Button variant="primary" size="sm">
                    + Log Visitor
                </Button>
            </div>
            <Table columns={COLUMNS} data={VISITORS} />
        </div>
    );
}
