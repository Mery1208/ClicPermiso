// Componente reutilizable para selects con validación
// Lo creo para no repetir código en cada select del formulario

import React, { useState } from 'react';
import './FormStyles.css';

// Defino el tipo para las opciones del select
interface Option {
    value: string;  // Valor que se envía
    label: string;  // Texto que se muestra
}

// Defino los props que acepta el componente con TypeScript
interface SelectCampoProps {
    label: string;           // Texto de la etiqueta
    name: string;            // Nombre del campo para el estado
    value: string;           // Valor actual seleccionado
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;  // Función para actualizar el estado
    options: Option[];       // Array de opciones para el select
    mensajeError?: string;   // Mensaje de error a mostrar (opcional)
    required?: boolean;      // Si el campo es obligatorio (opcional)
    defaultOptionLabel?: string;  // Texto de la opción por defecto (opcional)
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
    // Estado local para controlar si hay error de validación
    const [error, setError] = useState(false);

    // Esta función se ejecuta cuando el select pierde el foco (onBlur)
    // Valido si es requerido y no tiene valor
    const handleBlur = () => {
        if (required && !value) {
            setError(true);  // Muestro el error
        } else {
            setError(false); // Quito el error
        }
    };

    // Esta función se ejecuta cuando cambio la opción
    // Limpio el error para dar feedback positivo inmediato
    const handleChangeInternal = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setError(false);  // Quito el error al seleccionar algo
        onChange(e);      // Llamo a la función del padre para actualizar el estado
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
                    {/* Opción por defecto vacía */}
                    <option value="">{defaultOptionLabel}</option>
                    {/* Recorro las opciones y creo un option por cada una */}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            {/* Solo muestro el mensaje de error si hay error */}
            {error && <span className="error-msg">{mensajeError}</span>}
        </div>
    );
};

export default SelectCampo;
