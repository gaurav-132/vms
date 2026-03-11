import React from 'react';
export function Modal({ title, children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="modal__close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>
                {title && <h3 className="modal__title">{title}</h3>}
                {children}
            </div>
        </div>
    );
}
