import React from 'react';
export function Button({
    children,
    variant = 'primary',
    size = 'md',
    type = 'button',
    onClick,
    disabled,
    className = '',
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn--${variant} btn--${size} ${className}`}
        >
            {children}
        </button>
    );
}
