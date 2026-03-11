import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layout/PublicLayout';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public pages
import { HomePage } from '../pages/home/HomePage';
import { AboutPage } from '../pages/about/AboutPage';
import { PricingPage } from '../pages/pricing/PricingPage';

// Auth pages
import { LoginPage } from '../pages/login/LoginPage';
import { RegisterPage } from '../pages/register/RegisterPage';

// Admin pages
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { VisitorsPage } from '../pages/visitors/VisitorsPage';
import { InvitationsPage } from '../pages/invitations/InvitationsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { SettingsPage } from '../pages/settings/SettingsPage';

export function AppRouter() {
    return (
        <Routes>
            {/* ── Public Routes (with PublicLayout) ── */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
            </Route>

            {/* ── Auth Routes (no layout) ── */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ── Admin / Dashboard Routes (protected) ── */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="visitors" element={<VisitorsPage />} />
                <Route path="invitations" element={<InvitationsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* ── Catch All ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
