import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-layout__main">
                <Header />
                <main className="dashboard-layout__content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
