export type TId = number
export type TActiveQuestionNumber = number
export type TRightAnswer = number
export type TAnswer = string
export type TAnswers = { answers: Array<IAnswer>}
export type TResult = 'success' | 'error'
export type TResultElement = { [key:number]: TResult }
export type TResults = { [key:string]: TResultElement }
export type TAnswerState = {[key:number]:TResult}
export type TQuestion = string
export type TQuestions = Array<IQuestion>
export type TIsFinished = boolean

export interface IStore {
    quiz: IQuiz
    auth: IAuth
}

interface IQuiz {
    activeQuestionNumber: TActiveQuestionNumber
    results: TResults
    answerState: TAnswerState
    readonly questions: TQuestions
}

export interface IQuestion {
    readonly id: TId
    readonly question: TQuestion
    readonly answers: Array<IAnswer>
    readonly rightAnswer: TRightAnswer
}

export interface IAnswer {
    readonly id: TId
    readonly text: TAnswer
}

export interface IResults {
    results: TResults
    questions: TQuestions
}

export interface IAuth {
    registered: boolean
    idToken: string | null
    email: string | null
    localId: string | null
    refreshToken: string | null
    expiresIn: number | null
}

export default IQuiz
