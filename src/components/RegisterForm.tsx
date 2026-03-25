import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {sendRegister} from "../services/authService"


export const RegisterForm = () => {
    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ isLoanding, setIsLoanding ] = useState(false);
    
    const navigate = useNavigate();

    //Enviar el registro 
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setIsLoanding(true);
        
        const dataRegister = await sendRegister(userName, email, password);
        
        if(dataRegister){
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/")

        }else{
            setIsLoanding(false);
            console.error("No se pudo registrar")
        }
    }

   
    return(
        <form className="flex flex-col gap-4 bg-slate-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            
            {/* Input de Usuario */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="inputUserName" className="text-sm font-semibold text-slate-700"> Usuario </label>
                <input 
                    id="inputUsername"
                    className="border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl px-4 py-2.5 transition-all w-full"
                    type="text" 
                    placeholder="ej. usuari123"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>   

            {/* Input de Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="inputEmail" className="text-sm font-semibold text-slate-700"> Correo Electrónico </label>
                <input 
                    id="inputEmail" 
                    className="border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl px-4 py-2.5 transition-all w-full"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Input de Password */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="inputPassword" className="text-sm font-semibold text-slate-700"> Contraseña </label>
                <input 
                    id="inputPassword"
                    className="border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl px-4 py-2.5 transition-all w-full" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* Input de Confirmar Password */}
            <div className="flex flex-col gap-1.5 mb-2">
                <label htmlFor="inputConfirmPassword" className="text-sm font-semibold text-slate-700"> Confirmar Contraseña </label>
                <input 
                    id="inputConfirmPassword" 
                    className={`border focus:ring-2 outline-none rounded-xl px-4 py-2.5 transition-all w-full ${
                        confirmPassword.length > 0 && password !== confirmPassword 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {confirmPassword.length > 0 && password !== confirmPassword && (
                    <span className="text-red-500 text-sm mt-1">
                        Las contraseñas no coinciden
                    </span>
                )}
            </div>

            {/* Botón Principal */}
            <div className="mt-4">
                <button 
                    className={`w-full rounded-xl text-white px-6 py-3 font-bold shadow-md transition-all 
                        ${(password !== confirmPassword && confirmPassword.length > 0) || isLoanding 
                            ? "bg-slate-400 cursor-not-allowed" 
                            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg"
                        }`}
                    disabled={isLoanding || (password !== confirmPassword && confirmPassword.length > 0)} 
                >
                    {isLoanding ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </div>
            
            {/* Enlace para regresar al Login */}
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500"> 
                    ¿Ya tienes una cuenta?{' '}
                    <Link 
                        to="/"
                        className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors ml-1 hover:underline">
                            Inicia sesión
                    </Link>
                </p>
            </div>
        </form>
    )
}
