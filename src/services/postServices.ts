import axios from "axios";

const API_URL = 'http://localhost:3000';

//Obtener los post de feed
export const getServices = async () =>{
    //obtenemos el token que nos dara acceso
    const token = localStorage.getItem('token');
    try{
        const allPost = await axios.get( API_URL + "/feed",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return allPost;
    }catch(error){
        console.log(error)
    }
}

// Obtener mi post
export const getMyPost = async () => {
    const token = localStorage.getItem('token');
    try{
        const myPosts = await axios.get(API_URL + "/post",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return myPosts;
    }catch(error){
        console.log(error);
    }
}

// Crear post
export const createPost = async (content: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(API_URL + "/post", {
            content: content
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log("Error al crear publicacion:", error);
        throw error; 
    }
}

// Borrar post
export const deletePost = async(idPost: string) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.delete(API_URL +`/post/${idPost}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
        
    }catch(error){
        console.log("Error al borrar", error)
    }
}

// Seguir de seguir
export const unfollowUser = async (userIdUnfollow: string) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.delete(API_URL +`/unfollow/${userIdUnfollow}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }catch(error){
        console.error("No se pudo dejar de seguir", error);
    }
}

// Dejar de seguir
export const followUser = async (userIdToFollow: string) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.post(API_URL + `/follow/${userIdToFollow}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }catch(error){
        console.error("No se pudo seguir", error);
    }
}