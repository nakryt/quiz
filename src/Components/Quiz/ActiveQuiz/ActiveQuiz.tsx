import React, {FC, ReactElement} from "react"
import classes from "./ActiveQuiz.module.css"
import {useSelector} from "react-redux";
import {
    getActiveQuestionNumber,
    getQuestions,
} from "../../../store/selectors/quizSelectors";
import {IQuestion, TActiveQuestionNumber} from "../../../store/storeTypes";
import QuestionItem from "./QuestionItem/QuestionItem";

const ActiveQuiz: FC = (): ReactElement => {
    const activeQuestionNumber:TActiveQuestionNumber = useSelector(getActiveQuestionNumber)
    const questions:IQuestion[] = useSelector(getQuestions)
    return (
        <div className={classes.ActiveQuiz}>

            <QuestionItem id={questions[activeQuestionNumber].id}
                          question={questions[activeQuestionNumber].question}
                          answers={questions[activeQuestionNumber].answers}
                          rightAnswer={questions[activeQuestionNumber].rightAnswer}
                          allQuestions={questions.length}/>
        </div>
    )
}

export default ActiveQuiz
