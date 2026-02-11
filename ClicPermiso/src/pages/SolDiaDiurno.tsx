import React, { useState, useEffect } from 'react';
import InputCampo from '../components/forms/InputCampo';
import SelectCampo from '../components/forms/SelectCampo';
import '../components/forms/FormStyles.css';

const SolDiaDiurno = () => {
    //aqui pongo valores fijos que se usaran en el formulario padre
    const [formData, setFormData] = useState({
        diaSolicitado: '',
        telefono: '',
        jornada: '',
        turno: 'Diurno',
        horasDocencia: '',
        diasPermisos: '',
        permisoNoRetribuido: false
    });

    //hacer el estado para la fecha formateada en el header
    const [fechaFormateada, setFechaFormateada] = useState('');

    //uso el useEffect para que se actualice la fecha cada vez que cambia el valor de diaSolicitado
    useEffect(() => {
        // aqui hago las regex para validar formato  de la fecha dd/mm/yyyy
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

    //Función genérica para actualizar el estado de inputs
    // e es el evento que se produce al cambiar el valor del input
    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

        //formData hace que se actualice el estado de los inputs, lo he llamado yo asi como lo hizo borja
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //llevar del envío del formulario, lo que hace es validar el formulario y si no hay errores enviar los datos
    const manejarEnvio = (e: React.FormEvent) => {
        // e.preventDefault() evita que el formulario se envíe de forma predeterminada, ya que cuando haces click cambia 
        // el valor de los inputs y se reinicia el formulario y react se peta
        e.preventDefault();

        // Validación final antes de enviar
        const errores = validarFormulario();

        // si no hay errores envio los datos
        if (Object.keys(errores).length === 0) {
            console.log("Datos enviados:", formData);
            alert("Solicitud guardada correctamente");
        } else {
            console.log("Errores en el formulario:", errores);
            alert("Por favor, corrija los errores del formulario");
        }
    };

    //ahora validaciones final del formulario completo
    const validarFormulario = () => {
        const errores: { [key: string]: string } = {};

        // validación día solicitado (dd/mm/yyyy)
        const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!formData.diaSolicitado || !regexFecha.test(formData.diaSolicitado)) {
            errores.diaSolicitado = 'Formato inválido';
        }

        // validación teléfono ( que debe empezar por 6,7,8,9 y tiene 9 dígitos)
        const regexTelefono = /^[6789]\d{8}$/;
        if (!formData.telefono || !regexTelefono.test(formData.telefono)) {
            errores.telefono = 'Teléfono inválido';
        }

        // validación jornada
        if (!formData.jornada) {
            errores.jornada = 'Seleccione jornada';
        }

        // validación turno
        if (!formData.turno) {
            errores.turno = 'Seleccione turno';
        }

        // validación horas docencia ( tiene q ser mayor que 0 y menor que 8)
        const regexNumero = /^[1-7]$/;
        if (!formData.horasDocencia || !regexNumero.test(formData.horasDocencia)) {
            errores.horasDocencia = 'Número inválido';
        }

        // validación de los días permisos ( tiene q ser mayor que 0 y menor q 8)
        if (!formData.diasPermisos || !regexNumero.test(formData.diasPermisos)) {
            errores.diasPermisos = 'Número inválido';
        }

        return errores;
    };

    // la funcion pa cancelar y limpiar el formulario
    const manejarCancelar = () => {
        setFormData({
            diaSolicitado: '',
            telefono: '',
            jornada: '',
            turno: 'Diurno',
            horasDocencia: '',
            diasPermisos: '',
            permisoNoRetribuido: false
        });
    };

    // aqui las opciones para los selects 
    const opcionesJornada = [
        { value: 'Completa', label: 'Completa' },
        { value: 'Parcial', label: 'Parcial' }
    ];

    const opcionesTurno = [
        { value: 'Diurno', label: 'Diurno' },
        { value: 'Vespertino', label: 'Vespertino' }
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
                {/* en la fila 1: Día Solicitado y Teléfono */}
                <div className="form-row">
                    {/* valida dd/mm/yyyy */}
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

                    {/* Teléfono - empieza por 6,7,8,9 y 9 caracteres */}
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

                {/* en la fila 2: Jornada y Turno */}
                <div className="form-row">
                    {/* Jornada , es Completa o Parcial */}
                    <SelectCampo
                        label="Jornada"
                        name="jornada"
                        value={formData.jornada}
                        onChange={manejarCambio}
                        options={opcionesJornada}
                        mensajeError="Seleccione una jornada"
                        required={true}
                    />

                    {/* Turno, es Diurno o Vespertino */}
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

export default SolDiaDiurno;
