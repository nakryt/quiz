import React, {FunctionComponent, useState} from 'react';
import classes from './Layout.module.css';
import Burger from "../../UI/Burger/Burger";
import Drawer from "../../Navigation/Drawer/Drawer";

const Layout: FunctionComponent = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const onToggleMenuHandler = ():void => {
        setIsMenuOpen(open => !open)
    }
    return (
        <>
            <div>
                <Burger isOpen={isMenuOpen} onToggle={onToggleMenuHandler}/>
                <Drawer isOpen={isMenuOpen} onClose={onToggleMenuHandler}/>
            </div>
            <main className={classes.Layout}>

                {children}
            </main>
        </>
    );
};

export default Layout;
