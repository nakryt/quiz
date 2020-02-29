import React, {FC} from "react"
import classes from "./QuestionItem.module.css"
import {IQuestion} from "../../../../store/storeTypes";
import AnswersList from "./AnswersList/AnswersList";
type TQuestionItem = IQuestion & {allQuestions: number}
const QuestionItem:FC<Exclude<TQuestionItem, 'rightAnswer'>> = ({id, question, answers, allQuestions}) => {
    return (
        <div className={classes.QuestionItemWrapper}>
            {

                <div className={classes.QuestionItem} key={id}>
                    <div className={classes.QuestionItemTitle}>
                        <span className={classes.QuestionItemQuestion}>{question}?</span>
                        <span>{id + 1} из {allQuestions}</span>
                    </div>
                    <AnswersList answers={answers}/>
                </div>

            }
        </div>
    )
}

export default QuestionItem
