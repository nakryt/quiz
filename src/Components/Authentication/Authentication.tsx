import React, {Component, useEffect, useState} from 'react';
import classes from './Authentication.module.css'
import {reduxForm, Field, Form, InjectedFormProps} from "redux-form";
import Input from "../UI/Input/Input";
import {TAuth} from "../../store/formTypes";
import validate from "../../utils/validate"
import Button from "../UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {singIn, singUp} from "../../store/authActions";
import { Redirect } from 'react-router-dom';
import {getIsRegistered} from "../../store/selectors/authSelectors";

type TAuthSubmit = {
    onSubmitHandler: (data:TAuth, isLogin:boolean) => void
}

const minLength8 = validate.minLength(8)
const maxLength30 = validate.maxLength(30)

class Authentication extends Component<InjectedFormProps<TAuth, TAuthSubmit> & TAuthSubmit> {
    state = {
        isLogin: true
    }
    render() {
        const onSubmit = (isLogin:boolean, data:TAuth) => {
            this.props.onSubmitHandler(data, isLogin)
        }
        return (
            <div className={classes.AuthenticationWrap}>
                <Form className={classes.Authentication} onSubmit={this.props.handleSubmit(onSubmit.bind(this, this.state.isLogin))}>
                    <div className={classes.AuthenticationEmail}>
                        <Field name='email' component={Input}
                               type='email' placeholder='Email'
                               label={'Email'}
                               validate={[validate.required, maxLength30, validate.email]}
                        />
                    </div>
                    <div className={classes.AuthenticationPassword}>
                        <Field name='password' component={Input}
                               type='password' placeholder='Password'
                               label={'Password'}
                               validate={[validate.required, minLength8]}
                        />
                    </div>
                    <div className={classes.AuthenticationButtonWrap}>
                        <Button type={"success"}
                                disabled={!this.props.valid}
                                onClick={() => {this.setState({isLogin: true})}}
                        >Войти</Button>
                        <Button type={"primary"}
                                disabled={!this.props.valid}
                                onClick={() => {
                                    this.setState({isLogin: false})
                                }}
                        >Зарегистрироваться</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const AuthenticationContainer = reduxForm<TAuth, TAuthSubmit>({form: 'auth'})(Authentication)

const Login = () => {
    const dispatch = useDispatch()
    const registered = useSelector(getIsRegistered)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
            setRedirect(registered)
    }, [registered, setRedirect])
    const onSubmitHandler = async (data:TAuth, isLogin:boolean) => {
        if (isLogin) {
            dispatch(singIn(data))
        } else {
            dispatch(singUp(data))
        }
        if (registered)
            setRedirect(true)
    }
    return <>
        {
            redirect ? <Redirect to={'/'}/> :
                <AuthenticationContainer onSubmitHandler={onSubmitHandler}/>
        }
        </>
}
export default Login;
