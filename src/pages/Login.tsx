import { LoginForm } from "../components/LoginForm";

const Login = () => {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4"> 
            <div className="w-full max-w-md mb-8">
                <h1 className="font-extrabold text-4xl text-center text-slate-800 tracking-tight">
                    Bienvenido
                </h1>
                <p className="text-center text-slate-500 mt-2">
                    Inicia sesión para entrar a tu cuenta
                </p>
            </div>
            
            <div className="w-full">
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login;