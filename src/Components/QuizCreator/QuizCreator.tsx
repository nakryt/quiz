import React, {useState} from 'react';
import cls from "./QuizCreator.module.css"

import {TQuizCreator, TFieldItem} from "../../store/formTypes";
import {Controller, useForm} from "react-hook-form";
import {
    Container,
    createStyles,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    Theme,
    FormHelperText,
    Snackbar,
    useMediaQuery
} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert"
import {makeStyles} from "@material-ui/core/styles";
import {isFullForm} from "../../utils/utils"

type TProps = {
    fields: Array<TFieldItem>
    addQuestion: (question:TQuizCreator) => void
    createQuiz: () => Promise<number>
    disabledCreateButton: boolean
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '5rem',
            '& form': {
                width: '80%',
                maxWidth: '500px'
            },
            '& .MuiFormControl-root': {
                width: '100%',
            },
            '& .MuiFormHelperText-root': {
                color: 'red'
            },
            '& .buttonWrap': {
                margin: '1rem 0 2rem 0'
            },
            '& .MuiAlert-root': {
                width: '100%'
            },
            '& .MuiSnackbar-anchorOriginTopRight': {
                left: 'auto',
                top: '24px'
            },
            '& .MuiSnackbar-anchorOriginBottomCenter': {
                left: 'auto',
                right: 'auto'
            }
        },
        radioGroup: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
    })
)

type TAlert = {
    type: "success" | "info" | "warning" | "error" | undefined
    open: boolean
    message?: string
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const QuizCreator:React.FC<TProps> = ({fields, addQuestion, createQuiz, disabledCreateButton}) => {
    const classes = useStyles()
    const { control, register, handleSubmit, reset, errors, setValue, watch } = useForm()
    const [radioValue, setRadioValue] = useState(0)
    const fieldsValues = watch()
    const matches = useMediaQuery('(min-width:600px)')

    const [alert, setAlert] = useState<TAlert>({type: "success", open: false, message: ''})
    const handleAlertClose = () => {
        setAlert({...alert, open: false})
    }

    const changeRightAnswer = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(+e.target.value)
    }
    const clearForm = () => {
        reset()
        setValue( fields.map(item => ({[item.name]: ''})) )
        setRadioValue(0)
    }
    const createQuizHandler = async () => {
        const res = await createQuiz()
        if (res === 0) {
            setAlert({type: 'success', open: true, message: 'Тест создан!'})
            clearForm()
        } else {
            setAlert({type: 'error', open: true, message: 'Что-то пошло не так...'})
        }

    }
    const onSubmit = (data:any) => {
        addQuestion(data)
        clearForm()
    }

    return (
        <Container className={`${classes.root} ${cls.container}`}>

            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              onClose={handleAlertClose}
              style={{width: '65%'}}
              anchorOrigin={{ vertical: matches ? 'top' : 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={handleAlertClose} severity={alert.type}>
                {alert.message}
              </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction='column' spacing={1}>
                    {
                        fields.map(({name, label}) =>
                            <Grid item key={name}>
                                <Controller
                                    name={name}
                                    control={control}
                                    defaultValue=''
                                    rules={{required: {value: true, message: "Поле не может быть пустым"}}}
                                    as={<TextField label={label} fullWidth/>}
                                    required
                                />
                                {
                                    errors[name] &&
                                        <FormHelperText>{errors[name].message}</FormHelperText>
                                }
                            </Grid>)
                    }
                    <Grid item >
                        <h5>Выберите правильный ответ:</h5>
                        <RadioGroup
                            name='rightAnswer'
                            aria-label="right-answer"
                            value={radioValue}
                            onChange={changeRightAnswer}
                            className={classes.radioGroup}
                        >
                            <FormControlLabel inputRef={register} value={0} control={<Radio/>} label="№1"/>
                            <FormControlLabel inputRef={register} value={1} control={<Radio/>} label="№2"/>
                            <FormControlLabel inputRef={register} value={2} control={<Radio/>} label="№3"/>
                            <FormControlLabel inputRef={register} value={3} control={<Radio/>} label="№4"/>
                        </RadioGroup>

                    </Grid>

                    <Grid container item justify='space-around' className='buttonWrap'>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={!isFullForm(fieldsValues)}
                            type='submit'
                            style={{marginBottom: '1rem'}}
                        >Добавить вопрос</Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={disabledCreateButton}
                            onClick={createQuizHandler}
                            style={{marginBottom: '1rem'}}
                        >Создать тест</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default QuizCreator
