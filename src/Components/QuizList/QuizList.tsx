import React, {FunctionComponent, useEffect, useState} from 'react';
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";
import userAPI from "../../api/userAPI";
import Preloader from "../UI/Preloader/Preloader";

type Props = {};
type TQuizesList = Array<string>

const QuizList: FunctionComponent<Props> = (props) => {
    const [loading, setLoading] = useState(true)
    const [quizes, setQuizes] = useState<TQuizesList>([])
    useEffect(() => {
        const fetchingData = async () => {
            const response = await userAPI.getQuizes()
            if (response) {
                Object.keys(response).forEach(quiz => {
                    setQuizes(quizes => [...quizes, quiz])
                })
                setLoading(false)
            } else {
            setTimeout(() => {
                fetchingData()
            }, 2000) }
        }
        fetchingData()

    }, [setLoading, setQuizes])
    return (
        <div className={classes.QuizList}>
            <h1>Список тестов:</h1>
            {
                loading ? <Preloader/> :
                    <li>
                        {quizes.map((quiz, index) => (
                            <ul key={`${quiz}${index}`}>
                                <NavLink to={`/quiz/${quiz}`}>{`Тест №${index + 1}`}</NavLink>
                            </ul>
                        ))}
                    </li>
            }
        </div>
    );
};

export default QuizList;
