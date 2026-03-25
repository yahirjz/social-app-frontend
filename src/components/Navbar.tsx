import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    // Cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("token"); // Borramos el token de seguridad
        navigate("/"); 
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo return inicio< */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/feed" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                            SocialApp
                        </Link>
                    </div>

                    {/* Enlaces */}
                    <div className="hidden sm:flex space-x-6">
                        <Link to="/feed" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-bold transition-colors">
                            Inicio
                        </Link>
                        <Link to="/profile" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-bold transition-colors">
                            Mi Perfil
                        </Link>
                    </div>

                    {/* Botón de Logout */}
                    <div className="flex items-center gap-4">
                        {/* Enlace de perfil solo telefono */}
                        <Link to="/profile" className="sm:hidden text-indigo-600 font-bold text-sm">
                            Perfil
                        </Link>
                        
                        <button 
                            onClick={handleLogout}
                            className="bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-transparent hover:border-red-200 px-4 py-2 rounded-xl text-sm font-bold transition-all">
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
