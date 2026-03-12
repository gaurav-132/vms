import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/Badge';
import { Avatar } from '../../../components/Avatar';
import { Table } from '../../../components/Table';

const KPI = [
    {
        label: 'Total Visitors',
        value: '1,248',
        icon: '👥',
        iconBg: 'var(--clr-accent-soft)',
        trend: '+12%',
        dir: 'up',
    },
    {
        label: 'Active Today',
        value: '34',
        icon: '✅',
        iconBg: 'var(--clr-success-soft)',
        trend: '+5%',
        dir: 'up',
    },
    {
        label: 'Pending Invites',
        value: '7',
        icon: '📨',
        iconBg: 'var(--clr-warning-soft)',
        trend: '',
        dir: '',
    },
    {
        label: 'Total Users',
        value: '18',
        icon: '👤',
        iconBg: 'var(--clr-violet-soft)',
        trend: '+2',
        dir: 'up',
    },
];

const RECENT_VISITORS = [
    {
        name: 'Priya Sharma',
        host: 'Rahul Mehta',
        purpose: 'Meeting',
        time: '10:30 AM',
        status: 'active',
    },
    {
        name: 'James Wilson',
        host: 'Ananya Singh',
        purpose: 'Interview',
        time: '11:00 AM',
        status: 'active',
    },
    {
        name: 'Sara Khan',
        host: 'Dev Patel',
        purpose: 'Delivery',
        time: '09:15 AM',
        status: 'expired',
    },
    {
        name: 'Carlos Rivera',
        host: 'Meera Joshi',
        purpose: 'Visit',
        time: '08:45 AM',
        status: 'active',
    },
    {
        name: 'Emily Chen',
        host: 'Kiran Rao',
        purpose: 'Meeting',
        time: '07:30 AM',
        status: 'expired',
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
    { key: 'time', label: 'Check-in' },
    {
        key: 'status',
        label: 'Status',
        render: (val) => <Badge variant={val}>{val}</Badge>,
    },
];

export function DashboardPage() {
    return (
        <div className="dash-page anim-fade-in-up">
            <div>
                <h2 className="dash-page__title">Overview</h2>
                <p className="dash-page__subtitle">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <div className="kpi-grid">
                {KPI.map((k) => (
                    <div key={k.label} className="kpi-card">
                        <div className="kpi-card__header">
                            <span className="kpi-card__label">{k.label}</span>
                            <div
                                className="kpi-card__icon"
                                style={{ background: k.iconBg }}
                            >
                                {k.icon}
                            </div>
                        </div>
                        <div className="kpi-card__value">{k.value}</div>
                        {k.trend && (
                            <span
                                className={`kpi-card__trend kpi-card__trend--${k.dir}`}
                            >
                                {k.dir === 'up' ? '↑' : '↓'} {k.trend} vs last
                                week
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <div className="dash-content-row">
                    <span className="dash-section__title">Recent Visitors</span>
                    <Link
                        to="/dashboard/visitors"
                        className="btn btn--ghost btn--sm"
                    >
                        View All →
                    </Link>
                </div>
                <Table columns={COLUMNS} data={RECENT_VISITORS} />
            </div>
        </div>
    );
}
