import instance from "./instance"
import {TQuestions} from "../store/storeTypes"

const login = async () => {
    try {
        instance.get('quiz.json')
            .then(response => {
                debugger
                return response.data
            }).catch(e => {
                debugger
            console.log(e)
        })

    } catch (e) {
        console.log(e)
    }
}
const addQuiz = async (quiz:TQuestions) => {
    try {
        return (await instance.post('quizes.json', quiz)).data
    } catch (e) {
        console.log(e)
    }
}

const getQuiz = async (id:string) => {
    try {
        return (await instance.get(`quizes/${id}.json`)).data
    } catch (e) {
        console.log(e)
    }
}

const getQuizes = async () => {
    try {
        return (await instance.get('quizes.json')).data
    } catch (e) {
        console.log(e)
    }
}

export default {
    login,
    addQuiz,
    getQuiz,
    getQuizes,
}
