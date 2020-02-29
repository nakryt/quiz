import {IStore, TActiveQuestionNumber, TAnswerState, TId, TQuestions, TResult, TResults} from "./storeTypes";
import {Dispatch, Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {isEmpty} from "../utils/utils";
import userAPI from "../api/userAPI";

export const INCREASE_ACTIVE_QUESTION_NUMBER = 'QUIZ/INCREASE_ACTIVE_QUESTION_NUMBER'
export const SET_ACTIVE_QUESTION_NUMBER = 'QUIZ/SET_ACTIVE_QUESTION_NUMBER'
export const SET_IS_FINISHED = 'QUIZ/SET_IS_FINISHED'
export const SET_RESULT = 'QUIZ/SET_RESULT'
export const CLEAR_RESULTS = 'QUIZ/CLEAR_RESULTS'
export const SET_ANSWER_STATE = 'QUIZ/SET_ANSWER_STATE'
export const SET_QUIZ = 'QUIZ/SET_QUIZ'

interface IIncreaseActiveQuestion {
    type: typeof INCREASE_ACTIVE_QUESTION_NUMBER
}
interface ISetActiveQuestion {
    type: typeof SET_ACTIVE_QUESTION_NUMBER
    number: TActiveQuestionNumber
}
interface ISetResult {
    type: typeof SET_RESULT,
    result: TResults
}
interface IClearResults {
    type: typeof CLEAR_RESULTS,
}
interface ISetAnswerState {
    type: typeof SET_ANSWER_STATE,
    result: TAnswerState
}
interface ISetQuiz {
    type: typeof SET_QUIZ,
    quiz: TQuestions
}

export type TQuizActions = IIncreaseActiveQuestion | ISetResult | ISetAnswerState |
    ISetActiveQuestion | ISetQuiz | IClearResults

export const increaseActiveQuestion = ():TQuizActions => ({ type: INCREASE_ACTIVE_QUESTION_NUMBER })
const setActiveQuestionNumber = (number:TActiveQuestionNumber):TQuizActions =>
    ({ type: SET_ACTIVE_QUESTION_NUMBER, number })
export const resetQuiz = ():ThunkAction<void, IStore, null, Action<TQuizActions>> => (dispatch:Dispatch) => {
    dispatch(setActiveQuestionNumber(0))
    dispatch(clearResults())
}
export const setAnswerState = (result:TAnswerState):TQuizActions => ({ type: SET_ANSWER_STATE, result })
export const setResult = (result:TResults):TQuizActions => ({ type: SET_RESULT, result })
export const clearResults = ():TQuizActions => ({ type: CLEAR_RESULTS })
export const nextQuestion = (answerId:TId):ThunkAction<void, IStore, null, Action<TQuizActions>> =>
    (dispatch:Dispatch, getState) => {
    const {answerState, activeQuestionNumber, questions} = getState().quiz
    if (Object.values(answerState)[0] === 'success') {
        return
    }
    const result:boolean = questions[activeQuestionNumber].rightAnswer === answerId
    const resultString:TResult = result ? 'success' : 'error'
    const newResult = {[activeQuestionNumber]: {[answerId]: resultString}}
    dispatch(setAnswerState({[answerId]: resultString}))
    if (isEmpty(answerState)) {
        dispatch(setResult(newResult))
    }
    if (result) {
        setTimeout(async () => {
            await dispatch(increaseActiveQuestion())
            dispatch(setAnswerState({}))
        }, 600)
    }
}
export const setQuizAC = (quiz:TQuestions):TQuizActions => ({ type: SET_QUIZ, quiz})
export const getQuiz = (id:string):ThunkAction<Promise<boolean>, IStore, null, Action<TQuizActions>> => async (dispatch:ThunkDispatch<IStore, null, TQuizActions>) => {
    dispatch(resetQuiz())
    const quiz = await userAPI.getQuiz(id)
    dispatch(setQuizAC(quiz))
    return !!quiz
}
