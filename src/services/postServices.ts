import axios from "axios";

const API_URL = 'http://localhost:3000';

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