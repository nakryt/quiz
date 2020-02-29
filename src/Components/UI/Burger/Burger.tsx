import React from 'react'
import classes from './Burger.module.css'

interface IBurger {
    isOpen: boolean
    onToggle?: () => void
}

const Burger:React.FunctionComponent<IBurger> = ({isOpen, onToggle}) => {

    const cls = [
        classes.burger,
        isOpen ? classes.open : null
    ]
    return (<div onClick={onToggle}
                 className={cls.join(' ')}
        >
            <span className={classes.burgerItem}/>
            <span className={classes.burgerItem}/>
            <span className={classes.burgerItem}/>
        </div>)
};

export default Burger;
