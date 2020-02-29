import React, {FunctionComponent} from 'react';
import classes from './QuizCreator.module.css'
import {Field, Form, InjectedFormProps, reduxForm} from "redux-form";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import validate from "../../utils/validate";
import {TQuizCreator, TFieldItem, TQuizCreatorProps} from "../../store/formTypes";

const QuizCreator: FunctionComponent<InjectedFormProps<TQuizCreator, TQuizCreatorProps> & TQuizCreatorProps> = (props) => {
    return (
        <div className={classes.QuizCreatorWrap}>
            <Form className={classes.QuizCreator} onSubmit={props.handleSubmit} name={'quizCreator'}>
                {props.fields.map(({name, placeholder, label}:TFieldItem, index) =>
                    <Field key={`name-${index}`}
                           component={Input}
                           name={name}
                           placeholder={placeholder}
                           label={label}
                           validate={[validate.required]}
                           autocomplete={false}
                    />
                )}
                <span className={classes.QuizCreatorRightAnswerLabel}>Выберите правильный ответ:</span>
                <Field component="select" name={'rightAnswer'}
                       style={{padding: '5px 8px', width: 50}}
                       validate={[validate.required]}>
                    <option/>
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                </Field>
                <div className={classes.QuizCreatorButtonsWrap}>
                    <Button type={"success"} disabled={!props.valid}>Добавить вопрос</Button>
                    <Button disabled={props.disabledCreateButton} submit={false} onClick={props.createQuiz}>Создать тест</Button>
                </div>
            </Form>
        </div>
    )
};

export default reduxForm<TQuizCreator, TQuizCreatorProps>({form: 'quizCreator'})(QuizCreator);

