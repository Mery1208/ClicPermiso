import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

const MisDiasSolicitados = () => {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    // funcion asincrona para pedir los datos a la base de datos
    const fetchSolicitudes = async () => {
        try {
            setLoading(true);

            // hago la consulta a Supabase y pillo todo
            const { data, error } = await supabase
                .from('Tabla DiaSolicitado')
                .select('*');

            if (error) throw error;

            setSolicitudes(data || []);
        } catch (err: any) {
            setError(err.message);
            console.error('Error al obtener solicitudes:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        Mis Días Solicitados
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Volver
                    </button>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">
                            Error al cargar solicitudes: {error}
                        </div>
                    ) : solicitudes.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            No hay solicitudes registradas
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Día Solicitado</th>
                                        <th className="px-6 py-3">Turno</th>
                                        <th className="px-6 py-3">Estado</th>
                                        <th className="px-6 py-3">Fecha Solicitud</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitudes.map((solicitud) => (
                                        <tr key={solicitud.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{solicitud.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {/* El nombre de la columna en Supabase es DiaSolicitado (con mayusculas) */}
                                                {solicitud.DiaSolicitado || '---'}
                                            </td>
                                            <td className="px-6 py-4">{solicitud.turno || '---'}</td>
                                            <td className="px-6 py-4">
                                                {/* No veo columna estado en la captura, pongo pendiente por defecto o lo que venga */}
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                    ${solicitud.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                                                        solicitud.estado === 'Rechazado' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {solicitud.estado || 'Pendiente'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* Si no hay created_at, uso DiaSolicitado por ahora */}
                                                {solicitud.created_at ? new Date(solicitud.created_at).toLocaleDateString() : '---'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisDiasSolicitados;
