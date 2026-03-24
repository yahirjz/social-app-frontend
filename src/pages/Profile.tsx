import {useState, useEffect} from 'react';
import { getMyPost } from '../services/postServices';
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
    useEffect( () => {

        const getPost = async () => {
            const resposne = await getMyPost()

            if(resposne && resposne.data){
                setData(resposne.data)
            }
        } 
        getPost();
    },[]);
    console.log("Mis posts del perfil:", data);


    return(
        <section className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-3xl">
                
                {/* BLOQUE 2: Cabecera */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex-shrink-0 shadow-inner"></div>
                    <div className="text-center sm:text-left w-full">
                        <h1 className="text-3xl font-extrabold text-slate-800">Mi Perfil</h1>
                        <p className="text-slate-500 font-medium mt-1">
                            @{data.length > 0 && data[0].User ? data[0].User.username : "Usuario"}
                        </p>

                        <div className="flex gap-6 mt-4 justify-center sm:justify-start text-sm">
                            <p><span className="font-bold text-slate-800">{data.length}</span> Posts</p>
                            <p><span className="font-bold text-slate-800">120</span> Seguidores</p>
                            <p><span className="font-bold text-slate-800">95</span> Siguiendo</p>
                        </div>
                    </div>
                </div>

                {/* BLOQUE 3: Los Posts */}
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
                            </article>
                        ))
                    )}
                </div>

            </div>
        </section>
    )
}

export default Profile
