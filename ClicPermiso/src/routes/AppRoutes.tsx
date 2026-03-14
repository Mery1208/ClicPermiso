// aqui estan las rutas de cada pagina, que enseño borja para conectar las páginas

import { Routes, Route, Navigate } from 'react-router-dom';
import SolDiaDiurno from '../pages/SolDiaDiurno';
import SolDiaVespertino from '../pages/SolDiaVespertino';
import MiPerfil from '../pages/MiPerfil';
import MisDiasSolicitados from '../pages/MisDiasSolicitados';
import MisAusencias from '../pages/MisAusencias';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/sol-diurno" replace />} />
            <Route path="sol-diurno" element={<SolDiaDiurno />} />
            <Route path="sol-vespertino" element={<SolDiaVespertino />} />
            <Route path="mi-perfil" element={<MiPerfil />} />
            <Route path="dias-solicitados" element={<MisDiasSolicitados />} />
            <Route path="ausencias" element={<MisAusencias />} />
        </Routes>
    );
};

export default AppRoutes;
