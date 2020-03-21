import React, {useEffect, useState} from 'react';
import {TAuth} from "../../store/formTypes";
import {useDispatch, useSelector} from "react-redux";
import {singIn, singUp} from "../../store/authActions";
import { Redirect } from 'react-router-dom';
import {getIsRegistered} from "../../store/selectors/authSelectors";
import {Controller, useForm} from "react-hook-form";
import {
    Button,
    InputAdornment,
    Grid,
    OutlinedInput,
    FormControl,
    InputLabel,
    IconButton, FormHelperText
} from "@material-ui/core";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff, EmailOutlined} from '@material-ui/icons';

type TAuthProps = {
    onSubmitHandler: (data:TAuth, isLogin:boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '100vh',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            '& .MuiFormControl-root': {
                width: '100%',
            },
            '& .MuiInputBase-root': {
                background: 'transparent'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: '#4e4e4e'
            },
            '& .MuiFormHelperText-root': {
                color: 'red'
            }
        },
        margin: {
            marginBottom: theme.spacing(2),
        },
        buttonWrap: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: theme.spacing(2),
            '& button': {
                width: 90
            }
        }
    }),
);

const Authentication:React.FC = (props) => {
    const dispatch = useDispatch()
    const registered = useSelector(getIsRegistered)
    const classes = useStyles()

    const [isLogin, setIsLogin] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { control, handleSubmit, errors, } = useForm()

    useEffect(() => {
        setRedirect(registered)
    }, [registered, setRedirect])
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const onSubmitHandler = (data:any) => {
        if (isLogin) {
            dispatch(singIn(data))
        } else {
            dispatch(singUp(data))
        }
        if (registered)
            setRedirect(true)
    }
    return (
        <>
            { redirect && <Redirect to={'/'}/> }
            <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.root}>
                <Grid >
                    <Grid item >
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            as={
                                <FormControl
                                    className={classes.margin}
                                    variant="outlined">
                                    <InputLabel htmlFor="inputEmail">Email</InputLabel>
                                    <OutlinedInput
                                        id="inputEmail"
                                        error={!!errors.email}
                                        endAdornment={<EmailOutlined/>}
                                        labelWidth={45}
                                    />
                                    {
                                        errors.email &&
                                            <FormHelperText>{errors.email.message}</FormHelperText>
                                    }
                                </FormControl>}
                            rules={{
                                required: {value: true, message: "Поле является обязательным"},
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                    message: 'Введите коректный email'
                                }
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Controller
                            name='password'
                            className={classes.margin}
                            as={
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="inputPassword">Password</InputLabel>
                                    <OutlinedInput
                                        id="inputPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        error={!!errors.password}
                                        autoComplete={'off'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={toggleShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    {
                                        errors.password &&
                                            <FormHelperText>{errors.password.message}</FormHelperText>
                                    }
                                </FormControl>}
                            control={control}
                            defaultValue=''
                            rules={{
                                required: {value: true, message: "Поле является обязательным"},
                                minLength: {value: 8, message: "Минимальная длина: 8 символов"}
                            }}
                        />

                    </Grid>

                </Grid>

                <div className={classes.buttonWrap}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={() => setIsLogin(true)}
                    >Login</Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={() => setIsLogin(false)}
                    >SignUp</Button>
                </div>
            </form>
        </>
    );

}

export default Authentication;
