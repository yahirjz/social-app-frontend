import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            {/** Input del usuario  */}
            <div className="flex flex-col">
                <label htmlFor="inputUserName"> Usuario </label>
                <input 
                    id="inputUsername"
                    className=" border-1 border-purple-500 rounded-lg"
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
            </div>   

            {/** Input del Email  */}
            <div className="flex flex-col">
                <label htmlFor="inputEmail"> Email </label>
                <input 
                    id="inputEmail" 
                    className=" border-1 border-purple-500 rounded-lg"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
            </div>

            {/** Input del password  */}
            <div className="flex flex-col">
                <label htmlFor="inputPassword"> Contraseña </label>
                <input 
                    id="inputPassword"
                    className=" border-1 border-purple-500 rounded-lg" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
            </div>

            {/** Input del Confirmar Password  */}
            <div className="flex flex-col mb-4">
                <label htmlFor="inputConfirmPassword"> Confirmar Contraseña </label>
                <input 
                    id="inputConfirmPassword" 
                    className= {`border-1 rounded-lg ${
                        confirmPassword.length > 0 && password !== confirmPassword 
                        ? "border-red-500 outline-red-500" 
                        : "border-purple-500"
                    }`} 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    {/** Mensaje. Solo se muestra si han escrito algo mal y no coincide el password */}
                    {confirmPassword.length > 0 && password !== confirmPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            La Contraseña no coincide
                        </span>
                    )}

            </div>

            {/** Input del Boton  */}
            <div className=" flex justify-end">
                <button 
                className={` rounded-lg text-white px-6 py-2 font-semibold transition-colors
                    ${(password !== confirmPassword && confirmPassword.length > 0) || isLoanding 
                        ? "bg-slate-400 cursor-not-allowed" // Estilo bloqueado
                        : "bg-indigo-500 hover:bg-indigo-700" // Estilo normal
                    }`}
                disabled={isLoanding || (password !== confirmPassword && confirmPassword.length > 0)} >
                    {isLoanding ? 'Cargando...' : 'Registrarse'}
                </button>
            </div>
        </form>
    )
}
