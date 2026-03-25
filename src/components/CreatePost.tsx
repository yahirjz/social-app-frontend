import { useState } from "react";
import { createPost } from "../services/postServices";

interface CreatePostProps {
    onPostCreated: () => void;
}

export const CreatePost = ({ onPostCreated }: CreatePostProps) => {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!content.trim()) return; // Evitar posts vacíos
        
        setIsLoading(true);
        try {
            await createPost(content);
            setContent(""); 
            onPostCreated(); // Recargamos el post del feed
        } catch (error) {
            console.error("No se pudo crear el post");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-white p-5 sm:p-6 rounded-3xl shadow-md border border-slate-200 w-full max-w-2xl mx-auto mb-8 transition-all hover:shadow-lg"
        >
            <div className="flex gap-4">
                {/* Avatar genérico del usuario logueado */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    +
                </div>
                
                <div className="flex-grow flex flex-col gap-3">
                    <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none transition-all min-h-[100px]"
                        placeholder="¿Qué estás pensando hoy?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isLoading}
                    />
                    
                    <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-3">
                        <div className="text-xs font-medium text-slate-400">
                            {content.length} caracteres
                        </div>
                        <button 
                            type="submit"
                            disabled={isLoading || !content.trim()}
                            className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-sm transition-all
                                ${isLoading || !content.trim() 
                                    ? "bg-slate-300 cursor-not-allowed" 
                                    : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-md hover:-translate-y-0.5"
                                }`
                            }
                        >
                            {isLoading ? "Publicando..." : "Publicar"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
