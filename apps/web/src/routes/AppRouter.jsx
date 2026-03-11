import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { UsersPage } from "../features/users/pages/UsersPage";
import { VisitorsPage } from "../features/visitors/pages/VisitorsPage";
import { InvitationsPage } from "../features/invitations/pages/InvitationsPage";
import { SettingsPage } from "../features/settings/pages/SettingsPage";
import { DashboardLayout } from "../layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="visitors" element={<VisitorsPage />} />
                <Route path="invitations" element={<InvitationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
