import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/Badge';
import { Avatar } from '../../../components/Avatar';
import { Table } from '../../../components/Table';
import { useDashboard } from '../../../hooks/useDashboard';

export function DashboardPage() {
    const { stats, loading, error, fetchStats } = useDashboard();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading) {
        return <div className="dash-page">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="dash-page" style={{ color: 'var(--clr-danger)' }}>Error: {error}</div>;
    }

    if (!stats) return null;

    const KPI = [
        {
            label: 'Total Demo Requests',
            value: stats.totalDemoRequests,
            icon: '📨',
            iconBg: 'var(--clr-accent-soft)',
        },
        {
            label: 'New Demo Requests',
            value: stats.newDemoRequests,
            icon: '🆕',
            iconBg: 'var(--clr-warning-soft)',
        },
        {
            label: 'Active Portfolio Items',
            value: stats.activePortfolioItems,
            icon: '✅',
            iconBg: 'var(--clr-success-soft)',
        },
        {
            label: 'Total Users',
            value: stats.totalUsers,
            icon: '👤',
            iconBg: 'var(--clr-violet-soft)',
        },
    ];

    const COLUMNS = [
        {
            key: 'name',
            label: 'Lead',
            render: (val) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Avatar name={val} size={32} />
                    <span className="table-cell--bold">{val}</span>
                </div>
            ),
        },
        { key: 'company_name', label: 'Company' },
        { 
            key: 'created_at', 
            label: 'Date',
            render: (val) => new Date(val).toLocaleDateString()
        },
        {
            key: 'status',
            label: 'Status',
            render: (val) => <Badge variant={val.toLowerCase().replace(' ', '-')}>{val}</Badge>,
        },
    ];

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
                            <div className="kpi-card__icon" style={{ background: k.iconBg }}>
                                {k.icon}
                            </div>
                        </div>
                        <div className="kpi-card__value">{k.value}</div>
                    </div>
                ))}
            </div>

            <div>
                <div className="dash-content-row">
                    <span className="dash-section__title">Recent Demo Requests</span>
                    <Link to="/admin/demo-requests" className="btn btn--ghost btn--sm">
                        View All →
                    </Link>
                </div>
                <Table columns={COLUMNS} data={stats.recentRequests || []} />
            </div>
        </div>
    );
}
