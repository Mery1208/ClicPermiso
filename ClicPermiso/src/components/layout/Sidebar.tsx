import { NavLink } from 'react-router-dom';

const menuItems = [
    { id: 1, texto: 'Sol. día diurno', ruta: '/sol-diurno' },
    { id: 2, texto: 'Sol. día vespertino', ruta: '/sol-vespertino' },
    { id: 3, texto: 'Mi Perfil', ruta: '/mi-perfil' },
    { id: 4, texto: 'Mis días Solicitados', ruta: '/dias-solicitados' },
    { id: 5, texto: 'Mis ausencias', ruta: '/ausencias' },
];


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
                        <span>{item.texto}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
