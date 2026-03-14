// pagina del perfil
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCampo from '../components/forms/InputCampo';
import SelectCampo from '../components/forms/SelectCampo';
import { supabase } from '../supabase';

const MiPerfil = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        dni: '',
        relacion: '',
        anosServicio: '',
        haceSustitucion: false
    });

    // Cargo datos del perfil del usuario actual al entrar, 
    //uso el useEffect para que se cargue al entrar en la pagina
    useEffect(() => {
        const cargarPerfil = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error al cargar perfil:', error.message);
                return;
            }

            if (data) {
                // full_name puede ser "Nombre Apellido1 Apellido2", lo separo
                const partes = (data.full_name || '').split(' ');
                const nombre = partes[0] || '';
                const apellidos = partes.slice(1).join(' ') || '';

                setFormData(prev => ({
                    ...prev,
                    nombre,
                    apellidos,
                    email: data.email || user.email || '',
                    dni: data.dni || '',
                    relacion: data.relacion || '',
                    anosServicio: data.anos_servicio?.toString() || '',
                    haceSustitucion: data.hace_sustitucion || false,
                }));
            }
        };
        cargarPerfil();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const full_name = `${formData.nombre} ${formData.apellidos}`.trim();

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name,
                email: formData.email,
                dni: formData.dni,
                relacion: formData.relacion,
                anos_servicio: formData.anosServicio ? parseInt(formData.anosServicio) : null,
                hace_sustitucion: formData.haceSustitucion,
            })
            .eq('id', user.id);

        if (error) {
            alert('Error al guardar: ' + error.message);
        } else {
            alert('Perfil actualizado correctamente');
        }
    };

    const handleCancel = () => {
        navigate(-1); // Volver atrás
    };

    const relacionOptions = [
        { value: 'Otro', label: 'Otro' },
        { value: 'Indefinido', label: 'Indefinido' },
        { value: 'Temporal', label: 'Temporal' }
    ];

    return (
        <div className="max-w-6xl mx-auto p-8">
            {/* Header: Titulo y Botón Volver */}
            <div className="bg-white p-6 rounded-t-xl shadow-sm border-b border-gray-100 flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Editar Mi Perfil
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Volver
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Nombre - Validar primera letra mayúscula */}
                        <div className="col-span-1">
                            <InputCampo
                                label="Nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
                                mensajeError="El nombre debe comenzar con mayúscula."
                                placeholder="Maria"
                            />
                        </div>

                        {/* Apellidos - Dos apellidos, ambos con mayúscula inicial */}
                        <div className="col-span-1">
                            <InputCampo
                                label="Apellidos"
                                type="text"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/}
                                mensajeError="Debe introducir dos apellidos, ambos comenzando con mayúscula."
                                placeholder="Ceballos Mesias"
                            />
                        </div>

                        {/* Correo - Patrón de email */}
                        <div className="col-span-1">
                            <InputCampo
                                label="Correo Electrónico"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                regex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
                                mensajeError="Introduce un correo electrónico válido."
                                placeholder="mceballos@iesalbarregas.es"
                            />
                        </div>

                        {/* DNI - Formato válido (8 números y 1 letra) */}
                        <div className="col-span-1">
                            <InputCampo
                                label="DNI"
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                regex={/^\d{8}[A-Z]$/}
                                mensajeError="DNI inválido. Debe tener 8 números y una letra mayúscula."
                                placeholder="12345678Z"
                            />
                        </div>

                        {/* Relación Jurídica - Select */}
                        <div className="col-span-1">
                            <SelectCampo
                                label="Relación Juridica"
                                name="relacion"
                                value={formData.relacion}
                                onChange={handleChange}
                                options={relacionOptions}
                                required={true}
                                defaultOptionLabel="Otro"
                                mensajeError="Seleccione su relación jurídica."
                            />
                        </div>

                        {/* Años de servicio - Positivo menor a 50 */}
                        <div className="col-span-1">
                            <InputCampo
                                label="Años de Servicio"
                                type="number"
                                name="anosServicio"
                                value={formData.anosServicio}
                                onChange={handleChange}
                                regex={/^([0-9]|[1-4][0-9])$/}
                                mensajeError="Debe ser un número positivo menor a 50."
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Checkbox Hace sustitución */}
                    <div className="flex items-center">
                        <input
                            id="haceSustitucion"
                            name="haceSustitucion"
                            type="checkbox"
                            checked={formData.haceSustitucion}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="haceSustitucion" className="ml-2 block text-sm font-bold text-gray-700">
                            Hace sustitución
                        </label>
                    </div>

                    {/* Botones del footer */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transform transition hover:-translate-y-0.5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transform transition hover:-translate-y-0.5"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MiPerfil;
