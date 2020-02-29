import React from "react"
import classes from "./Cancel.module.css"
import { ReactComponent as CancelIcon } from "./cross.svg";

interface ICancel {
    width?: number
    onClick?: (event:React.MouseEvent) => void
}

const Cancel:React.FC<ICancel> = ({width = 20, onClick}) => {

    return (
        <span className={classes.CancelWrapper}>
            <span className={classes.Cancel} onClick={onClick} style={{width, height: width}}>
                <CancelIcon width={width} height={width}/>
            </span>
        </span>
    )
};

export default Cancel;
