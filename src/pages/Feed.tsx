import { getServices } from "../services/postServices";
import { useEffect, useState } from "react";

export interface Post {
    id:string,
    content: string,
    img_url: string | null,
    User: {
        username: string,
        foto_url: string | null
    }
}
const Feed = () => {
    
    const [ data, setData ] = useState<Post[]>([]);

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await getServices()
            
            //Validadmos que tengamos datos
            if(response && response.data){
                setData(response.data);
            }
        }
        fetchPosts();
    }, []);

    return(
        <section className="min-h-screen bg-slate-100 py-10 px-4 flex flex-col items-center">
            
            <h1 className="text-3xl font-bold text-slate-800 mb-8 self-start max-w-2xl w-full mx-auto">
                Últimas Publicaciones
            </h1>
            
            <div className="w-full max-w-2xl flex flex-col gap-6">
                
                {data.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-lg">
                            No hay publicaciones aún. ¡Anímate a escribir la primera! ✍️
                        </p>
                    </div>
                ) : (
                    data.map((post) => {
                        return(
                            <article key={post.id} className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                                {/** Contenedor del usuario y foto */}
                                <div className="flex items-center gap-3 mb-4">
                                    {post.User.foto_url ? (
                                        <img 
                                            src={post.User.foto_url} 
                                            alt={`Avatar de ${post.User.username}`} 
                                            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                                            {post.User.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    {/** Contenedor del username y fecha */}
                                    <div>
                                        <h3 className="font-semibold text-slate-800">{post.User.username}</h3>
                                        <p className="text-xs text-slate-400">Hace unas horas</p>
                                    </div>
                                </div>
                                {/** Contenido del post */}
                                <p className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
                                    {post.content}
                                </p>
                                
                                {post.img_url && (
                                    <div className="rounded-xl overflow-hidden mt-2">
                                        <img 
                                            src={post.img_url} 
                                            alt="Imagen del post" 
                                            className="w-full h-auto object-cover max-h-96"
                                        />
                                    </div>
                                )}
                                {/**Adicionales de me gusta o comentar */}
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-slate-500 text-sm font-medium">
                                    <button className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                                        ❤️ Me gusta
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                                        💬 Comentar
                                    </button>
                                </div>

                            </article>
                        )
                    })
                )}
            </div>
        </section>
    )
}
export default Feed