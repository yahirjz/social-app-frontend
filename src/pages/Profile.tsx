import {useState, useEffect} from 'react';
import { deletePost, getMyPost, getMyFollowers, getMyFollows } from '../services/postServices';
import { Navbar } from '../components/Navbar';

export interface Post {
    id:string,
    content: string,
    img_url: string | null,
    User: {
        username: string,
        foto_url: string | null
    }
}

const Profile = () => {
    const [ data, setData ] = useState<Post[]>([])
    const [cantSeguidores, setCantSeguidores] = useState<number>(0);
    const [cantSiguiendo, setCantSiguiendo] = useState<number>(0);

    //función para obtener mis post
    const handleGetPost = async () => {
        const resposne = await getMyPost()

        if(resposne && resposne.data){
            setData(resposne.data)
        }
    } 
    //Función para borrar post
    const handleDelete = async (idPos:string) => {
        if(window.confirm("¿Estas seguro de que quieres borrar este post?")){
            await deletePost(idPos)
            handleGetPost();
        }
    }
        // Función para averiguar cuántos me siguen y a cuántos sigo
    const fetchFollowData = async () => {
        // Le hablamos a la API
        const misSeguidos = await getMyFollows();
        const misSeguidores = await getMyFollowers();

        // El backend responde arreglos en crudo, así que calculamos la cantidad (.length)
        if (misSeguidos) setCantSiguiendo(misSeguidos.length);
        if (misSeguidores) setCantSeguidores(misSeguidores.length);
    }

    useEffect( () => {
        handleGetPost();
        fetchFollowData();
    },[]);


    return(
        <div className="min-h-screen bg-slate-50">
            <Navbar/>
            <section className="py-10 px-4 flex flex-col items-center">
                <div className="w-full max-w-3xl ">
                    
                    {/* Bloque de usuario */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 mb-10">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex-shrink-0 shadow-inner"></div>
                        <div className="text-center sm:text-left w-full">
                            <h1 className="text-3xl font-extrabold text-slate-800">Mi Perfil</h1>
                            <p className="text-slate-500 font-medium mt-1">
                                @{data.length > 0 && data[0].User ? data[0].User.username : "Usuario"}
                            </p>

                            <div className="flex gap-6 mt-4 justify-center sm:justify-start text-sm">
                                <p><span className="font-bold text-slate-800">{data.length}</span> Posts</p>
                                <p><span className="font-bold text-slate-800">{cantSeguidores}</span> Seguidores</p>
                                <p><span className="font-bold text-slate-800">{cantSiguiendo}</span> Siguiendo</p>
                            </div>
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="flex flex-col gap-6">
                        {data.length === 0 ? (
                            <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200">
                                <p className="text-slate-500 text-lg">Aún no tienes publicaciones. ¡Escribe algo!</p>
                            </div>
                        ) : (
                            data.map((post) => (
                                <article key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                    {post.img_url && (
                                        <div className="rounded-xl overflow-hidden mt-4">
                                            <img src={post.img_url} alt="Post image" className="w-full h-auto object-cover max-h-96"/>
                                        </div>
                                    )}
                                    {/* Boton de borrar */}
                                    <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                                        <button 
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                                            Eliminar
                                        </button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Profile
