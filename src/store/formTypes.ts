export type TAuth = {
    email: string
    password: string
}


export type TFieldItem = {name: string, placeholder: string, label: string}
export type TFieldTemplates = Array<TFieldItem>
export type TFieldTemplatesFunction = (fieldsNumber:number) => TFieldTemplates
export type TQuizCreator = {
    question: string,
    answer_1:string,
    answer_2:string,
    answer_3:string,
    answer_4:string,
    rightAnswer:string
}

export type TQuizCreatorProps = {
    fields: TFieldTemplates
    createQuiz: () => number
    disabledCreateButton?: boolean
}
