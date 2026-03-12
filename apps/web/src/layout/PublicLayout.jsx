import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

export function PublicLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isMenuOpen]);

    return (
        <div className="public-layout">
            <nav className={`public-nav ${isMenuOpen ? 'public-nav--open' : ''}`}>
                <Link to="/" className="public-nav__logo" onClick={closeMenu}>
                    XYZ<span>.</span>Solutions
                </Link>

                {/* Desktop Links */}
                <div className="public-nav__links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/solutions">Solutions</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>

                <div className="public-nav__actions">
                    <Link to="/login" className="btn btn--ghost btn--sm">
                        Login
                    </Link>
                    <Link to="/book-demo" className="btn btn--primary btn--sm">
                        Book Demo
                    </Link>

                    {/* Hamburger Toggle */}
                    <button
                        className="public-nav__mobile-toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <div className={`hamburger ${isMenuOpen ? 'hamburger--open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`public-nav__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/solutions" onClick={closeMenu}>Solutions</NavLink>
                    <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                    <div className="mobile-menu__footer">
                        <Link to="/login" className="btn btn--secondary" onClick={closeMenu}>Login</Link>
                        <Link to="/book-demo" className="btn btn--primary" onClick={closeMenu}>Book Demo</Link>
                    </div>
                </div>
            </nav>

            <main className="public-main">
                <Outlet />
            </main>

            <footer className="public-footer">
                <div className="public-footer__inner">
                    <div className="public-footer__brand">
                        <h3>
                            XYZ<span>.</span>Solutions
                        </h3>
                        <p>
                            The modern visitor management platform for
                            forward-thinking organizations.
                        </p>
                    </div>
                    <div className="public-footer__col">
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/solutions">Solutions</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="public-footer__col">
                        <h4>Account</h4>
                        <ul>
                            <li>
                                <Link to="/login">Admin Login</Link>
                            </li>
                            <li>
                                <Link to="/book-demo">Book Demo</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="public-footer__bottom">
                    <p>
                        &copy; {new Date().getFullYear()} XYZ Solutions. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
