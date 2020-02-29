import React, {FunctionComponent, useRef, useState} from 'react';
import classes from './Authentication.module.css'
import {reduxForm, Field, Form, InjectedFormProps} from "redux-form";
import Input from "../UI/Input/Input";
import {TAuth} from "../../store/formTypes";
import userAPI from "../../api/userAPI";
import validate from "../../utils/validate"
import Button from "../UI/Button/Button";

type TAuthSubmit = {
    onSubmitHandler: (values:object, isLogin:boolean) => void
}

const minLength8 = validate.minLength(8)
const maxLength30 = validate.maxLength(30)
const Authentication: FunctionComponent<InjectedFormProps<TAuth, TAuthSubmit> & TAuthSubmit> = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <div className={classes.AuthenticationWrap}>
            <Form className={classes.Authentication} >
                <div className={classes.AuthenticationEmail}>
                    <Field name='email' component={Input}
                           type='email' placeholder='Email'
                           label={'Email:'}
                           validate={[validate.required, maxLength30, validate.email]}
                    />
                </div>
                <div className={classes.AuthenticationPassword}>
                    <Field name='password' component={Input}
                           type='password' placeholder='Password'
                           label={'Password:'}
                           validate={[validate.required, minLength8]}
                    />
                </div>
                <div className={classes.AuthenticationButtonWrap}>
                    <Button type={"success"}
                            disabled={!props.valid}
                            onClick={props.handleSubmit}
                    >Войти</Button>
                    <Button type={"primary"}
                            disabled={!props.valid}
                            onClick={() => {
                                setIsLogin(false)
                            }}
                    >Зарегистрироваться</Button>
                </div>
            </Form>
        </div>
    );
};

const AuthenticationContainer = reduxForm<TAuth, TAuthSubmit>({form: 'auth'})(Authentication)

const Login = () => {
    // localStorage.
    // const onSubmit = async (data:{email:string, password:string}) => {
    //     debugger
    //     const singInHandler = async () => {
    //         const response = await userAPI.singIn(data.email, data.password)
    //     }
    //     const singUpHandler = async () => {
    //         const {email, password} = data
    //         const configData = {
    //             returnSecureToken: true,
    //             email,
    //             password
    //         }
    //         const response = await userAPI.singUp(data.email, data.password)
    //         debugger
    //     }
    //     singUpHandler()

    // }
    const onSubmit = (data:object, isLogin:any) => {
        debugger
    }
    const onSubmitHandler = (values:object, isLogin:boolean) => {
        debugger
    }
    return <AuthenticationContainer onSubmitHandler={onSubmitHandler} onSubmit={onSubmit}/>
}
export default Login;
