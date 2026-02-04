// aqui he hecho el menu de la izquierda con los botones para ir a cada pagina

import { NavLink } from 'react-router-dom';

const menuItems = [
    { id: 1, texto: 'Sol. día diurno', ruta: '/sol-diurno' },
    { id: 2, texto: 'Sol. día vespertino', ruta: '/sol-vespertino' },
    { id: 3, texto: 'Mi Perfil', ruta: '/mi-perfil' },
    { id: 4, texto: 'Mis días Solicitados', ruta: '/dias-solicitados' },
    { id: 5, texto: 'Mis ausencias', ruta: '/ausencias' },
];

const IconoCalendario = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const IconoPersona = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const Sidebar = () => {
    return (
        <aside className="w-56 bg-white min-h-screen pt-4">
            <nav className="flex flex-col gap-1 px-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.ruta}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        {item.id === 3 ? <IconoPersona /> : <IconoCalendario />}
                        <span>{item.texto}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
