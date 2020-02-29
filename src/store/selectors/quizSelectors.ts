import IQuiz, {IAnswer, TAnswerState, IQuestion, TResults, TIsFinished} from "../storeTypes"
import {createSelector} from "reselect";

export const quiz = (state: { quiz:IQuiz }):IQuiz => state.quiz
export const getActiveQuestionNumber =
    createSelector(quiz, (quiz:IQuiz):number => quiz.activeQuestionNumber)

export const getQuestions =
    createSelector(quiz, (quiz:IQuiz):IQuestion[] => quiz.questions)

export const getResults =
    createSelector(quiz, (quiz:IQuiz):TResults => quiz.results)

export const getAnswerState =
    createSelector(quiz, (quiz:IQuiz):TAnswerState => quiz.answerState)

export const getIsFinished = createSelector(getQuestions, getActiveQuestionNumber,
    (questions, activeQuestion):TIsFinished => questions && questions.length === activeQuestion)

export const getActiveQuestion = createSelector(getQuestions, getActiveQuestionNumber,
    (questions:IQuestion[], active:number):string => questions[active].question)
export const getAnswers = createSelector(getQuestions, getActiveQuestionNumber,
    (questions:IQuestion[], active:number):IAnswer[] => questions[active].answers)
export const getRightAnswer = createSelector(getQuestions, getActiveQuestionNumber,
    (questions:IQuestion[], active:number):number => questions[active].rightAnswer)
