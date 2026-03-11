import React from 'react';

const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
    '#ec4899',
];

function getColor(name = '') {
    const idx = name.charCodeAt(0) % COLORS.length;
    return COLORS[idx];
}

export function Avatar({ name = '', size = 40, src }) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    const style = {
        width: size,
        height: size,
        borderRadius: '50%',
        background: getColor(name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        overflow: 'hidden',
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                style={{ ...style, objectFit: 'cover' }}
            />
        );
    }

    return <div style={style}>{initials}</div>;
}
