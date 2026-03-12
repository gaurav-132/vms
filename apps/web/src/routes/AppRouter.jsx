import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layout/PublicLayout';
import { AdminLayout } from '../layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ScrollToTop } from '../components/ScrollToTop';

// Public pages (Web)
import { HomePage } from '../pages/web/HomePage';
import { AboutPage } from '../pages/web/AboutPage';
import { PricingPage } from '../pages/web/PricingPage';
import { Solutions } from '../pages/web/Solutions';
import { BookDemoPage } from '../pages/web/BookDemoPage';

// Auth pages (Web)
import { LoginPage } from '../pages/web/LoginPage';
// RegisterPage was deliberately removed from imports

// Admin pages
import { DashboardPage } from '../pages/admin/dashboard/DashboardPage';
import { UsersPage } from '../pages/admin/users/UsersPage';
import { SettingsPage } from '../pages/admin/settings/SettingsPage';
import { PortfolioPage } from '../pages/admin/portfolio/PortfolioPage';
import { DemoRequestsPage } from '../pages/admin/demo-requests/DemoRequestsPage';

export function AppRouter() {
    return (
        <>
            <ScrollToTop />
            <Routes>
            {/* ── Public Routes (with PublicLayout) ── */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/book-demo" element={<BookDemoPage />} />
            </Route>

            {/* ── Auth Routes (no layout) ── */}
            <Route path="/login" element={<LoginPage />} />

            {/* ── Admin / Dashboard Routes (protected) ── */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="demo-requests" element={<DemoRequestsPage />} />
            </Route>

            {/* ── Catch All ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </>
    );
}
