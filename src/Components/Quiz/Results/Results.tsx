import React, { FunctionComponent } from 'react';
import classes from './Results.module.css';
import {IResults} from "../../../store/storeTypes";
import Check from "../../UI/Check/Check";
import Cancel from "../../UI/Cancel/Cancel";
import {useDispatch} from "react-redux";
import {resetQuiz} from "../../../store/quizActions";
import Button from "../../UI/Button/Button";
import {Link} from 'react-router-dom';

const Results: FunctionComponent<IResults> = ({results, questions}) => {
    const dispatch = useDispatch()
    const resetHandler = () => {
        dispatch(resetQuiz())
    }
    return (
      <div className={classes.ResultsWrap}>
          <h1 className={classes.ResultsTitle}>Тест завершен</h1>
          <ul className={classes.ResultsList}>
          {
              Object.values(results).map((value, index) =>
                  Object.values(value).map(result => {
                      return (
                          <li key={index} className={classes.ResultsItem}>
                              <span className={classes.ResultsQuestion}>{questions[index].question}?</span>
                              <span className={classes.ResultsIcon}>
                                  { result === 'success' ? <Check/> : <Cancel/> }
                              </span>
                          </li>
                      )
                  })
              )
          }
          </ul>
          <div className={classes.ResultsButtonWrap}>
              <Button type={"error"} onClick={resetHandler}>Повторить</Button>
              <Link to={'/quiz-list'}>
                  <Button type={"success"}>Спискок тестов</Button>
              </Link>
          </div>
      </div>
  );
};

export default Results;
