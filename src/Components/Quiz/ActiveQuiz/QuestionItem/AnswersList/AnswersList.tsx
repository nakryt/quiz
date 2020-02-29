import React, {FunctionComponent} from 'react';
import classes from './AnswersList.module.css';
import {TAnswers} from "../../../../../store/storeTypes";
import AnswerItem from "./AnswerItem/AnswerItem";


type Props = TAnswers

const AnswersList: FunctionComponent<Props> = ({answers}) => {
    return (
        <div className={classes.AnswersList}>
            {
                answers.map(({id, text}) => <AnswerItem key={id} id={id} text={text}/>)
            }
        </div>
    );
};

export default AnswersList;
