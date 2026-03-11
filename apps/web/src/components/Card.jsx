import React from 'react';
export function Card({
    children,
    hover = false,
    accent = false,
    className = '',
}) {
    const classes = [
        'card',
        hover ? 'card--hover' : '',
        accent ? 'card--accent' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={classes}>{children}</div>;
}
