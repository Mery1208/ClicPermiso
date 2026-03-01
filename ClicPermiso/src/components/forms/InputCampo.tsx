import React, { useState } from 'react';
import './FormStyles.css';

interface InputCampoProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    regex?: RegExp;
    mensajeError?: string;
    placeholder?: string;
}

const InputCampo: React.FC<InputCampoProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    regex,
    mensajeError,
    placeholder = ''
}) => {
    const [error, setError] = useState(false);

    const handleBlur = () => {
        if (regex) {
            if (!regex.test(value)) {
                setError(true);
            } else {
                setError(false);
            }
        }
    };

    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        onChange(e);
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-wrapper">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChangeInternal}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={error ? 'error' : ''}
                />
            </div>
            {error && <span className="error-msg">{mensajeError}</span>}
        </div>
    );
};

export default InputCampo;
