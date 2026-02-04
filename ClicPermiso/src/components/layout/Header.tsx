// aqui esta el header que sale arriba de la pagina

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
                <img src="/imagen/logo_albarregas.jpg" alt="logo" className="h-12" />
                <div className="w-px h-10 bg-gray-300"></div>
                <h1 className="text-xl font-semibold text-gray-800">I.E.S Albarregas</h1>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-gray-600">Hola, Maria</span>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
