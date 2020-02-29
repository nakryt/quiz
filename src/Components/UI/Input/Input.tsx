import React, {FunctionComponent} from 'react'
import classes from './Input.module.css'

interface OwnProps {
    input?: object
    meta: IMeta
    type?: string
    textarea?: string
    label?: string
    style?: object
    placeholder?: string
}

interface IMeta {
    warning: string
    error: string
    valid: boolean
    touched: boolean
}


type Props = OwnProps

const Input: FunctionComponent<Props> = ({type = 'text', input, meta, textarea, label, style, placeholder}) => {
    const htmlFor = `input${Math.random()}`
    const { warning, error, valid, touched } = meta
    const hasError = !valid && touched && (error || warning)
    const cls = [classes.Input, hasError && classes.Error]
    return (
        <div className={classes.InputWrapper}>
        <label className={classes.InputLabel} htmlFor={htmlFor}>{ label }:</label>
            {
                textarea === 'true' ?
                    <textarea {...input} style={style} className={cls.join(' ')}
                              placeholder={placeholder} id={htmlFor}/> :
                    <input type={type} {...input} style={style} className={cls.join(' ')}
                           placeholder={placeholder} id={htmlFor}/>
            }
            { hasError && <div className={classes.ErrorSpan}>{error || warning}</div>}
        </div>
    )
}

export default Input
