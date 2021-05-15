import React, { useContext } from 'react';
import { ApplicationContext } from '../../Context/ApplicationContext';
import Header from './Header/Header';
import classes from './Layout.module.css';

function Layout(props){
    const appContext = useContext(ApplicationContext);
    
    return <div className={([classes.container, classes[appContext.themeMode]]).join(' ')}>
        <Header></Header>
        <div className={classes.mainBody}>
            {props.children}
        </div>
    </div>
}

export default Layout;