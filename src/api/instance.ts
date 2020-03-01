import axios from 'axios'

export const API_KEY = process.env.REACT_APP_APIKEY
const instance = axios.create({
    baseURL: 'https://quiz-36da1.firebaseio.com/',
    headers: {
        "API-KEY": API_KEY
    }
})

export default instance
