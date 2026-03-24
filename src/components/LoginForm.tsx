import { useState } from "react"
import { postUserData } from "../services/authService";
import { useNavigate } from "react-router-dom";

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
            <div className=" flex flex-col">
                <label htmlFor="emailInput" > Email</label>
                <input
                    id="emailInput"
                    className=" border-1 border-purple-500 rounded-lg"
                    type="text"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>

            <div className="flex  flex-col ">
                <label htmlFor="passwordInput"> Contraseña </label>
                <input
                    id="passwordInput"
                    className=" border-1 border-purple-500 rounded-lg"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-2 font-semibold transition-colors "
                    disabled={isLoanding}> {isLoanding ? 'Cargando...' : 'Iniciar'} </button>
            </div>
        </form>
    )
}