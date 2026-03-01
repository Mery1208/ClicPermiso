import React, { useState } from 'react';
import './FormStyles.css';

interface Option {
    value: string;
    label: string;
}

interface SelectCampoProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    mensajeError?: string;
    required?: boolean;
    defaultOptionLabel?: string;
}

const SelectCampo: React.FC<SelectCampoProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    mensajeError = 'Seleccione una opción',
    required = false,
    defaultOptionLabel = '---------'
}) => {
    const [error, setError] = useState(false);

    const handleBlur = () => {
        if (required && !value) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleChangeInternal = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setError(false);
        onChange(e);
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-wrapper">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChangeInternal}
                    onBlur={handleBlur}
                    className={error ? 'error' : ''}
                >
                    <option value="">{defaultOptionLabel}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <span className="error-msg">{mensajeError}</span>}
        </div>
    );
};

export default SelectCampo;
