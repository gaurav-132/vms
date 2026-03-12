import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from './Avatar';
import { NAVIGATION_ITEMS } from '../constants/navigation';
import { authService } from '../services/authService';

export function AdminSidebar({ isOpen, onClose }) {
    const session = authService.getSession();
    const userName = session?.email?.split('@')[0] || 'User';
    const userRole = session?.role || 'Admin';

    return (
        <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <div className="sidebar__logo-text">
                        XYZ<span>.</span>Solutions
                    </div>
                    <div className="sidebar__logo-sub">Enterprise Tech Solutions</div>
                </div>
                <button className="sidebar__close" onClick={onClose} aria-label="Close Sidebar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <nav className="sidebar__nav">
                <span className="sidebar__nav-label">Main Menu</span>
                {NAVIGATION_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/dashboard'}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `sidebar__nav-item${isActive ? ' active' : ''}`
                        }
                    >
                        <span className="sidebar__nav-icon" aria-hidden="true">
                            {item.icon}
                        </span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar__user">
                <Avatar name={userName} size={36} />
                <div className="sidebar__user-info">
                    <div className="sidebar__user-name">{userName}</div>
                    <div className="sidebar__user-role">{userRole}</div>
                </div>
            </div>
        </aside>
    );
}
