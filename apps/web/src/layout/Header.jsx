import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { authService } from '../services/authService';

const PAGE_TITLES = {
    '/dashboard': 'Dashboard',
    '/dashboard/visitors': 'Visitors',
    '/dashboard/invitations': 'Invitations',
    '/dashboard/users': 'Users',
    '/dashboard/settings': 'Settings',
};

export function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const session = authService.getSession();
    const userName = session?.email?.split('@')[0] || 'User';

    const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <header className="admin-header">
            <div className="admin-header__left">
                <span className="admin-header__page-title">{pageTitle}</span>
                <span className="admin-header__breadcrumb">
                    Home / {pageTitle}
                </span>
            </div>

            <div className="admin-header__right">
                <div className="admin-header__search">
                    <svg
                        className="sidebar__nav-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search..." />
                </div>

                <button
                    className="admin-header__icon-btn"
                    aria-label="Notifications"
                >
                    <div className="admin-header__badge" />
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>

                <button
                    className="admin-header__avatar-btn"
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <Avatar name={userName} size={28} />
                    <span>{userName}</span>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
