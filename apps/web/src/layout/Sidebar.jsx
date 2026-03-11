import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { NAVIGATION_ITEMS } from '../constants/navigation';
import { authService } from '../services/authService';

export function Sidebar() {
    const session = authService.getSession();
    const userName = session?.email?.split('@')[0] || 'User';
    const userRole = session?.role || 'Admin';

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <div className="sidebar__logo-text">
                    VMS<span>.</span>
                </div>
                <div className="sidebar__logo-sub">Visitor Management</div>
            </div>

            <nav className="sidebar__nav">
                <span className="sidebar__nav-label">Main Menu</span>
                {NAVIGATION_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/dashboard'}
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
