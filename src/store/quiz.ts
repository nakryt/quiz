import IQuiz from "./storeTypes"
import {
    INCREASE_ACTIVE_QUESTION_NUMBER,
    SET_RESULT,
    SET_ANSWER_STATE,
    SET_ACTIVE_QUESTION_NUMBER,
    TQuizActions,
    SET_QUIZ,
    CLEAR_RESULTS
} from "./quizActions";

const initialState:IQuiz = {
    activeQuestionNumber: 0,
    results: {},
    answerState: {},
    questions: [],
}

const quiz = (state = initialState, action: TQuizActions): IQuiz => {
    switch (action.type) {
        case INCREASE_ACTIVE_QUESTION_NUMBER:
            return { ...state, activeQuestionNumber: state.activeQuestionNumber + 1 }
        case SET_RESULT:
            return { ...state, results: {...state.results, ...action.result} }
        case SET_ANSWER_STATE:
            return { ...state, answerState: action.result }
        case SET_ACTIVE_QUESTION_NUMBER:
            return { ...state, activeQuestionNumber: action.number }
        case SET_QUIZ:
            return { ...state, questions: action.quiz}
        case CLEAR_RESULTS:
            return { ...state, results: {} }

        default:
            return state
    }
}

export default quiz
