import React, {FunctionComponent} from 'react';
import classes from './Button.module.css'

type Props = {
    type?: 'primary' | 'secondary' | 'success' | 'error' | 'outline',
    onClick?: (event: React.MouseEvent) => void
    disabled?: boolean
    style?: object
    submit?: boolean
};

const Button: FunctionComponent<Props> = ({type = 'primary', children, disabled = false, style, onClick, submit = true}) => {
    const cls = [
        classes.Button,
        classes[type]
    ]
    return (
        <button className={cls.join(' ')} onClick={onClick}
                disabled={disabled} style={style}
                type={submit ? "submit" : "button"}
        >
            {children}
        </button>
    );
};

export default Button;
