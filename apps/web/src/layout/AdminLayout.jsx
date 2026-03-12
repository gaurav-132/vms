import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar} />
            )}
            
            <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            
            <div className="admin-layout__main">
                <AdminHeader onToggleSidebar={toggleSidebar} />
                <main className="admin-layout__content">
                    <div className="admin-layout__content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
