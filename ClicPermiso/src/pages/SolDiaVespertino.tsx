import React, { useState, useEffect } from 'react';
import InputCampo from '../components/forms/InputCampo';
import SelectCampo from '../components/forms/SelectCampo';
import '../components/forms/FormStyles.css';

const SolDiaNocturno = () => {
    const [formData, setFormData] = useState({
        diaSolicitado: '',
        telefono: '',
        jornada: '',
        turno: 'Nocturno',
        horasDocencia: '',
        diasPermisos: '',
        permisoNoRetribuido: false
    });

    const [fechaFormateada, setFechaFormateada] = useState('');

    useEffect(() => {
        const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;

        if (formData.diaSolicitado && regexFecha.test(formData.diaSolicitado)) {
            const [, dia, mes, ano] = formData.diaSolicitado.match(regexFecha)!;
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];
            const mesNombre = meses[parseInt(mes, 10) - 1];
            setFechaFormateada(`${parseInt(dia, 10)} de ${mesNombre} de ${ano}`);
        } else {
            setFechaFormateada('');
        }
    }, [formData.diaSolicitado]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();

        const errores = validarFormulario();

        if (Object.keys(errores).length === 0) {
            console.log("Datos enviados:", formData);
            alert("Solicitud guardada correctamente");
        } else {
            console.log("Errores en el formulario:", errores);
            alert("Por favor, corrija los errores del formulario");
        }
    };

    const validarFormulario = () => {
        const errores: { [key: string]: string } = {};

        const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!formData.diaSolicitado || !regexFecha.test(formData.diaSolicitado)) {
            errores.diaSolicitado = 'Formato inválido';
        }

        const regexTelefono = /^[6789]\d{8}$/;
        if (!formData.telefono || !regexTelefono.test(formData.telefono)) {
            errores.telefono = 'Teléfono inválido';
        }

        if (!formData.jornada) {
            errores.jornada = 'Seleccione jornada';
        }

        if (!formData.turno) {
            errores.turno = 'Seleccione turno';
        }

        const regexNumero = /^[1-7]$/;
        if (!formData.horasDocencia || !regexNumero.test(formData.horasDocencia)) {
            errores.horasDocencia = 'Número inválido';
        }

        if (!formData.diasPermisos || !regexNumero.test(formData.diasPermisos)) {
            errores.diasPermisos = 'Número inválido';
        }

        return errores;
    };

    const manejarCancelar = () => {
        setFormData({
            diaSolicitado: '',
            telefono: '',
            jornada: '',
            turno: 'Nocturno',
            horasDocencia: '',
            diasPermisos: '',
            permisoNoRetribuido: false
        });
    };

    const opcionesJornada = [
        { value: 'Completa', label: 'Completa' },
        { value: 'Parcial', label: 'Parcial' }
    ];

    const opcionesTurno = [
        { value: 'Diurno', label: 'Diurno' },
        { value: 'Vespertino', label: 'Vespertino' },
        { value: 'Nocturno', label: 'Nocturno' }
    ];

    return (
        <div className="sol-diurno-form">
            <div className="form-header">
                <div className="form-title">
                    <h2>Solicitar Día: {fechaFormateada || '---'}</h2>
                </div>
                <button type="button" className="btn-volver">
                    <span>↺</span> Volver
                </button>
            </div>

            <form onSubmit={manejarEnvio} className="solicitud-form">
                    <div className="form-row">
                    <InputCampo
                        label="Día Solicitado"
                        type="text"
                        name="diaSolicitado"
                        value={formData.diaSolicitado}
                        onChange={manejarCambio}
                        regex={/^(\d{2})\/(\d{2})\/(\d{4})$/}
                        mensajeError="Formato inválido. Use dd/mm/yyyy"
                        placeholder="23/04/2026"
                    />

                    <InputCampo
                        label="Número de Teléfono"
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={manejarCambio}
                        regex={/^[6789]\d{8}$/}
                        mensajeError="Debe empezar por 6, 7, 8 ó 9 y tener 9 dígitos"
                        placeholder=""
                    />
                </div>

                <div className="form-row">
                    <SelectCampo
                        label="Jornada"
                        name="jornada"
                        value={formData.jornada}
                        onChange={manejarCambio}
                        options={opcionesJornada}
                        mensajeError="Seleccione una jornada"
                        required={true}
                    />

                    <SelectCampo
                        label="Turno Solicitado"
                        name="turno"
                        value={formData.turno}
                        onChange={manejarCambio}
                        options={opcionesTurno}
                        mensajeError="Seleccione un turno"
                        required={true}
                        defaultOptionLabel=""
                    />
                </div>

                {/* en la fila 3: están los números de horas y días */}
                <div className="form-row">
                    {/* Número de horas docencia - números positivos > 0 y < 8 */}
                    <InputCampo
                        label="Núm de horas de docencia directa y guardias afectadas"
                        type="text"
                        name="horasDocencia"
                        value={formData.horasDocencia}
                        onChange={manejarCambio}
                        regex={/^[1-7]$/}
                        mensajeError="Debe ser un número entre 1 y 7"
                        placeholder=""
                    />

                    {/* Número de días permisos - números positivos > 0 y < 8 */}
                    <InputCampo
                        label="Núm de días de permisos solicitados en el centro"
                        type="text"
                        name="diasPermisos"
                        value={formData.diasPermisos}
                        onChange={manejarCambio}
                        regex={/^[1-7]$/}
                        mensajeError="Debe ser un número entre 1 y 7"
                        placeholder=""
                    />
                </div>

                {/* en la fila 4: Checkbox tiene el permiso no retribuido */}
                <div className="form-row checkbox-row">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="permisoNoRetribuido"
                            checked={formData.permisoNoRetribuido}
                            onChange={manejarCambio}
                        />
                        <span>Estoy solicitando un día de permiso no retribuido</span>
                    </label>
                </div>

                {/* Botones con el onclick */}
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={manejarCancelar}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn-submit">
                        Guardar Solicitud
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SolDiaNocturno;
