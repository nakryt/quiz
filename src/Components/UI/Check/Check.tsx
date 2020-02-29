import React from "react"
import classes from "./Check.module.css"
import { ReactComponent as CheckIcon } from "./check-mark.svg";

interface ICheck {
    width?: number
    onClick?: (event:React.MouseEvent) => void
}

const Check:React.FC<ICheck> = ({ width = 20, onClick}) => {
    return (
        <span className={classes.CheckWrapper}>
            <span className={classes.Check} style={{width, height: width}} onClick={onClick}>
                <CheckIcon width={width} height={width}/>
            </span>
        </span>
    )
};

export default Check;
