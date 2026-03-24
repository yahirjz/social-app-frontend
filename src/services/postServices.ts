import axios from "axios";

const API_URL = 'http://localhost:3000';

export const getServices = async () =>{
    //obtenemos el token que nos dara acceso
    const token = localStorage.getItem('token');
    try{
        const resGet = await axios.get( API_URL + "/feed",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resGet;
    }catch(error){
        console.log(error)
    }
}