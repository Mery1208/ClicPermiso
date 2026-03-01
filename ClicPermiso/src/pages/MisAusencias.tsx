// pagina de ausencias
import { useNavigate } from 'react-router-dom';

const MisAusencias = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Title & Back Button */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        Historial de Ausencias Justificadas
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

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Período ausencia</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Estado</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Última Modificación</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Anexo V</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Adjuntos</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example Row */}
                            <tr className="bg-white hover:bg-gray-50 transition-colors border-b border-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900 text-center">
                                    14/01/2026 al 15/01/2026
                                </td>
                                <td className="px-6 py-4 text-center">
                                    Pendiente de Justificación
                                </td>
                                <td className="px-6 py-4 text-center">
                                    15/01/2026 23:30
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        Justificar día
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MisAusencias;
