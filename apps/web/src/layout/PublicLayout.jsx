import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

export function PublicLayout() {
	return (
		<div className="public-layout">
			<nav className="public-nav">
				<Link to="/" className="public-nav__logo">
					VMS<span>.</span>
				</Link>

				<div className="public-nav__links">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/pricing">Pricing</NavLink>
				</div>

				<div className="public-nav__actions">
					<Link to="/login" className="btn btn--ghost btn--sm">
						Login
					</Link>
					<Link to="/register" className="btn btn--primary btn--sm">
						Get Started
					</Link>
				</div>
			</nav>

			<main className="public-main">
				<Outlet />
			</main>

			<footer className="public-footer">
				<div className="public-footer__inner">
					<div className="public-footer__brand">
						<h3>
							VMS<span>.</span>
						</h3>
						<p>
							The modern visitor management platform for
							forward-thinking organizations.
						</p>
					</div>
					<div className="public-footer__col">
						<h4>Product</h4>
						<ul>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/pricing">Pricing</Link>
							</li>
							<li>
								<Link to="/register">Get Started</Link>
							</li>
						</ul>
					</div>
					<div className="public-footer__col">
						<h4>Account</h4>
						<ul>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/register">Register</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="public-footer__bottom">
					<p>
						&copy; {new Date().getFullYear()} VMS Cloud. All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
