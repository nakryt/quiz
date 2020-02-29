import React, {useEffect, useState} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import {useDispatch, useSelector} from "react-redux";
import {getIsFinished, getQuestions, getResults} from "../../store/selectors/quizSelectors";
import Results from "./Results/Results";
import {IQuestion, TResults} from "../../store/storeTypes";
import { RouteComponentProps } from "react-router-dom";
import {getQuiz} from "../../store/quizActions";
import Preloader from "../UI/Preloader/Preloader";

type TProps = { id: string }

const Quiz = ({match}: RouteComponentProps<TProps>) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetching = async () => {
            const result = await dispatch(getQuiz(match.params.id))
            if (!!result) {
                setLoading(false)
            } else {
                setTimeout(() => {
                    fetching()
                }, 2000)
            }
        }
        fetching()
    }, [match.params.id, dispatch, setLoading])
    const isFinished = useSelector(getIsFinished)
    const questions:IQuestion[] = useSelector(getQuestions)
    const results:TResults = useSelector(getResults)
    return (
        <div className={classes.Quiz}>
            {
                loading ? <Preloader/> :
                isFinished ?
                    <Results results={results} questions={questions}/> :
                    <ActiveQuiz/>
            }
        </div>
    )
}

export default Quiz
