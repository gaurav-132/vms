import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

export function Modal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && dialog) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else if (!isOpen && dialog) {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal-container"
            onCancel={onClose}
            onClick={handleBackdropClick}
        >
            <div className="modal-content-wrapper">
                <ModalContext.Provider value={{ onClose }}>
                    {children}
                </ModalContext.Provider>
            </div>
        </dialog>,
        document.body
    );
}

Modal.Header = function ModalHeader({ title, children }) {
    const { onClose } = useContext(ModalContext);
    return (
        <div className="modal-header">
            <h3 className="modal-title">{title || children}</h3>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
};

Modal.Body = function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
    return <div className="modal-footer">{children}</div>;
};
