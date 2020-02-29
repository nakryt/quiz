import axios from 'axios'

export const API_KEY = "AIzaSyB-94Sq7L7VD9mOxw1d4zRL1EIjK6-aAYY"
const instance = axios.create({
    baseURL: 'https://quiz-36da1.firebaseio.com/',
    headers: {
        "API-KEY": API_KEY
    }
})

export default instance
