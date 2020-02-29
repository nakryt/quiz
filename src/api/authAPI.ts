import axios from "axios";
import { API_KEY } from "./instance";

const singIn = async (email:string, password:string) => {
    try {
        const configData = {
            returnSecureToken: true,
            email,
            password
        }
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-94Sq7L7VD9mOxw1d4zRL1EIjK6-aAYY', configData)
        return response.data
    } catch (e) {
        return e.response.data
    }
}

const singUp = async (email:string, password:string) => {
    try {
        const configData = {
            returnSecureToken: true,
            email,
            password
        }
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-94Sq7L7VD9mOxw1d4zRL1EIjK6-aAYY', configData)
        return response.data
    } catch (e) {
        return e.response.data
    }
}

const refreshToken = async (refreshToken: string) => {
    try {
        const configData = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, configData)
        return response.data
    } catch (e) {
        return e.response.data
    }
}

export default {
    singIn,
    singUp,
    refreshToken
}
