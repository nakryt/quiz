import React, {FunctionComponent} from 'react';
import classes from './AnswerItem.module.css';
import {IAnswer} from "../../../../../../store/storeTypes";
import {useDispatch, useSelector} from "react-redux";
import {nextQuestion} from "../../../../../../store/quizActions";
import {getAnswerState} from "../../../../../../store/selectors/quizSelectors";
type Props = IAnswer;

const AnswerItem: FunctionComponent<Props> = ({text, id}) => {
    const answer = useSelector(getAnswerState)
    const classString = answer[id]
    const cls = [
        classes.AnswerItem,
        classes[classString]
    ]
    const dispatch = useDispatch()
    const onClickHandler = (event: React.MouseEvent) => {
        dispatch(nextQuestion(id))
    }
    return (
        <div className={cls.join(' ')} onClick={onClickHandler}>
            {text}
        </div>
    );
};

export default AnswerItem;
