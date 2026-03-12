import React from 'react';
export function Badge({ children, variant = 'active' }) {
    return <span className={`badge badge--${variant}`}>{children}</span>;
}
