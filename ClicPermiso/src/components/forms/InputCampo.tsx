// Componente reutilizable para inputs con validación
// Lo creo para no repetir código en cada input del formulario

import React, { useState } from 'react';
import './FormStyles.css';

// Defino los props que acepta el componente con TypeScript
interface InputCampoProps {
    label: string;          // Texto de la etiqueta
    type: string;           // Tipo de input (text, number, etc)
    name: string;           // Nombre del campo para el estado
    value: string;          // Valor actual del input
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Función para actualizar el estado
    regex?: RegExp;         // Expresión regular para validar (opcional)
    mensajeError?: string;  // Mensaje de error a mostrar (opcional)
    placeholder?: string;   // Placeholder del input (opcional)
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
    // Estado local para controlar si hay error de validación
    const [error, setError] = useState(false);

    // Esta función se ejecuta cuando el input pierde el foco (onBlur)
    // Aquí hago la validación con la regex
    const handleBlur = () => {
        if (regex) {
            // .test() devuelve true si el valor cumple la regex, false si no
            if (!regex.test(value)) {
                setError(true);  // Muestro el error
            } else {
                setError(false); // Quito el error
            }
        }
    };

    // Esta función se ejecuta cuando escribo en el input
    // Limpio el error para dar feedback positivo inmediato
    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);  // Quito el error al empezar a escribir
        onChange(e);      // Llamo a la función del padre para actualizar el estado
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
            {/* Solo muestro el mensaje de error si hay error */}
            {error && <span className="error-msg">{mensajeError}</span>}
        </div>
    );
};

export default InputCampo;
