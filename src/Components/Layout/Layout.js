import React from 'react';
import Header from './Header/Header';
import classes from './Layout.module.css';

function Layout(props){
    return <div className={classes.container}>
        <Header></Header>
        <div className={classes.mainBody}>
            {props.children}
        </div>
    </div>
}

export default Layout;