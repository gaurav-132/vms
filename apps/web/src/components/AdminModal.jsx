import React from 'react';
import { Modal } from './Modal';

/**
 * @deprecated Use Modal directly for compound component pattern
 */
export function AdminModal({ isOpen, onClose, title, children }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header title={title} />
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}
