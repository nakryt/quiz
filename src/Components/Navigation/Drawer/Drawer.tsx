import React, {FunctionComponent} from 'react';
import classes from './Drawer.module.css';
import {NavLink} from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {getIsRegistered} from "../../../store/selectors/authSelectors";
import {logout} from "../../../store/authActions";


interface IDrawer {
    isOpen: boolean
    onClose: () => void
}

const Drawer: FunctionComponent<IDrawer> = ({isOpen, onClose}) => {
    const cls = [classes.Drawer, isOpen && classes.DrawerOpen]
    const registered = useSelector(getIsRegistered)
    const dispatch = useDispatch()
    const onLogoutHandler = () => {
        dispatch(logout())
        onClose()
    }
    return (
        <>
            <nav className={cls.join(' ')}>
                <NavLink to='/' className={classes.DrawerLink} onClick={onClose}>Список тестов</NavLink>
                {
                    registered ?
                        <>
                            <NavLink to='/quiz-creator' className={classes.DrawerLink}
                                     onClick={onClose}>Создать тест</NavLink>
                            <NavLink to={'/'} className={classes.DrawerLink} onClick={onLogoutHandler}>Выход</NavLink>
                        </> :
                            <NavLink to='/login' className={classes.DrawerLink}
                                     onClick={onClose}>Авторизация</NavLink>
                }
            </nav>
            <Backdrop isShow={isOpen} onClick={onClose}/>
        </>
    );
};

export default Drawer;
