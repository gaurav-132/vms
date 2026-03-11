import React from 'react';
export function Input({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    required,
    error,
    helper,
    name,
}) {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="field">
            {label && (
                <label className="field__label" htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                className={`field__input${error ? ' field__input--error' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete="off"
            />
            {error && <span className="field__error">{error}</span>}
            {helper && !error && (
                <span className="field__helper">{helper}</span>
            )}
        </div>
    );
}
