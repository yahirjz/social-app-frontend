import { useState } from "react"
import { postUserData } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoanding, setIsLoanding] = useState(false);
    const navigate = useNavigate();

    // Enviar mensaje
    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoanding(true);
        const data = await postUserData(email, password); // <-- mandamos nuestros valores de email y password
        //validamor de OK
        if (data.token) {
            localStorage.setItem('token', data.token); //<-- Guardamos el Token en el Storage
            // Limpiadores de los inputs
            setEmail("");
            setPassword("");
            //cambiamos ruta
            navigate('/feed');

        } else {
            setIsLoanding(false);
            console.error("Hubo un proble en iniciar sessión");
        }

    }

    return (
        <form className="flex flex-col gap-4 bg-slate-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md mx-auto" onSubmit={sendForm}>
            {/* Input de Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="emailInput" className="text-sm font-semibold text-slate-700"> Correo Electrónico </label>
                <input
                    id="emailInput"
                    className="border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl px-4 py-2.5 transition-all w-full"
                    type="text"
                    placeholder="ejemplo@correo.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>

            {/* Input de Contraseña */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="passwordInput" className="text-sm font-semibold text-slate-700"> Contraseña </label>
                <input
                    id="passwordInput"
                    className="border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl px-4 py-2.5 transition-all w-full"
                    type="password"
                    placeholder="••••••••"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>

            {/* Botón Principal (Ancho Completo) */}
            <div className="mt-6">
                <button
                    className={`w-full rounded-xl text-white px-6 py-3 font-bold shadow-md transition-all 
                        ${isLoanding ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg'}`}
                    disabled={isLoanding}> 
                    {isLoanding ? 'Iniciando sesión...' : 'Entrar a mi cuenta'} 
                </button>
            </div>

            {/* Divisor y Enlace de Registro */}
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500"> 
                    ¿Aún no tienes cuenta?{' '}
                    <Link 
                        to="/register"
                        className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors ml-1 hover:underline">
                            Regístrate aquí
                    </Link>
                </p>
            </div>
        </form>
    )
}