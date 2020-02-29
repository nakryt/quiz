import React, {FunctionComponent} from 'react';
import classes from './Backdrop.module.css';

interface IBackdrop {
    isShow: boolean
    onClick: () => void
}

const Backdrop: FunctionComponent<IBackdrop> = ({onClick, isShow}) => {
    const cls = [isShow && classes.Backdrop]
    return (
        <div className={cls.join(' ')} onClick={onClick}/>
    );
};

export default Backdrop;
