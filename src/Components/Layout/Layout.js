import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../Context/ApplicationContext';
import Header from './Header/Header';
import classes from './Layout.module.css';
import axios from '../../Tools/fetch'
import { AuthenticationContext } from '../../Context/AuthenticationContext';

function Layout(props){
    const appContext = useContext(ApplicationContext);
    const authContext = useContext(AuthenticationContext);

    useEffect(() => {
        axios.post('user/IsTokenValid', {token: window.localStorage.getItem('token')})
            .then(result => {
                if (result.data.status){
                    authContext.login();
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[authContext])

    return <div className={([classes.container, classes[appContext.themeMode]]).join(' ')}>
        <Header></Header>
        <div className={classes.mainBody}>
            {props.children}
        </div>
    </div>
}

export default Layout;