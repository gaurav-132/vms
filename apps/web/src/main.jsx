import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* ── Design tokens ── */
import './styles/tokens/colors.css';
import './styles/tokens/spacing.css';
import './styles/tokens/shadows.css';
import './styles/tokens/radius.css';

/* ── Base styles ── */
import './styles/base/reset.css';
import './styles/base/global.css';
import './styles/base/typography.css';

/* ── Animations ── */
import './styles/animations.css';

/* ── Component styles ── */
import './styles/components/button.css';
import './styles/components/card.css';
import './styles/components/input.css';
import './styles/components/badge.css';
import './styles/components/table.css';
import './styles/components/modal.css';

/* ── Layout styles ── */
import './styles/layout/public-layout.css';
import './styles/layout/admin-layout.css';

/* ── Page styles ── */
import './styles/pages/home.css';
import './styles/pages/pricing.css';
import './styles/pages/about.css';
import './styles/pages/products.css';
import './styles/pages/book-demo.css';
import './styles/pages/login.css';
import './styles/pages/dashboard.css';
import './styles/pages/portfolio.css';
import './styles/pages/users.css';
import './styles/pages/settings.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
