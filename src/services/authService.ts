import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const postUserData = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_URL + "/auth/login", {
            email,
            password
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const sendRegister = async (username: string, email: string, password: string) => {
    try {
        const responseResgiter = await axios.post(API_URL + "/auth/register", {
            username,
            email,
            password
        });
        return responseResgiter.data
    } catch (error) {
        console.log(error);
    }
}