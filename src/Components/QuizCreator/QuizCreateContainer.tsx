import React, {FunctionComponent, useState} from 'react';
import QuizCreator from "./QuizCreator";
import {TFieldTemplates, TFieldTemplatesFunction, TQuizCreator} from '../../store/formTypes';
import {IAnswer, IQuestion, TId} from "../../store/storeTypes";
import {reset} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import userAPI from "../../api/userAPI";
import {getIsRegistered} from "../../store/selectors/authSelectors";
import { Redirect } from 'react-router-dom';

type Props = {};
const QuizCreateContainer: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch()
    const fieldTemplates:TFieldTemplatesFunction = (fieldsNumber:number) => {
        const fields:TFieldTemplates = []
        for (let i = 0; i < fieldsNumber; i++) {
            if (!i) {
                fields.push({name: 'question', placeholder: 'Вопрос', label: 'Напишите вопрос'})
            } else {
                fields.push({name: `answer_${i}`, placeholder: 'Вариант ответа', label: `Вариант ответа ${i}`})
            }
        }
        return fields
    }
    const [questionId, setQuestionId] = useState<TId>(0)
    const [quiz, setQuiz] = useState<Array<IQuestion>>([])
    const addQuestion = (data: TQuizCreator) => {
        let question = ''
        let rightAnswer = 0
        const answers:Array<IAnswer> = []
        Object.entries(data).forEach((val):void => {
            const [key, value] = val
            if (key === 'question') {
                question = value
            } else if (key === 'rightAnswer') {
                rightAnswer = +value
            }
            else {
                const id = +key[key.length - 1] - 1
                answers.push({id, text: value})
            }
        })
        setQuiz(items => [...items, {id: questionId, question, rightAnswer, answers}])
        setQuestionId(id => id + 1)
        dispatch(reset('quizCreator'))
    }
    const createQuizHandler = async () => {
        const response = await userAPI.addQuiz(quiz)
        if (response) {
            setQuestionId(0)
            setQuiz([])
            return 0
        }
        return 1
    }
    const registered = useSelector(getIsRegistered)
    return (
        <>
            {
                registered ?
                    <QuizCreator
                        fields={fieldTemplates(5)}
                        addQuestion={addQuestion}
                        createQuiz={createQuizHandler}
                        disabledCreateButton={!quiz.length}
                    /> :
                    <Redirect to='/' />
            }
        </>
    )

}

export default QuizCreateContainer
