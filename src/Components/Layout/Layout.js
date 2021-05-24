import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../Context/ApplicationContext';
import Header from './Header/Header';
import classes from './Layout.module.css';
import axios from '../../Tools/fetch'
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import {useSelector} from 'react-redux';
import Loading from '../UI/Loading/Loading';

function Layout(props){
    const appContext = useContext(ApplicationContext);
    const authContext = useContext(AuthenticationContext);

    const isLoading = useSelector(loadingStore => loadingStore.loading);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token){

            axios.post('user/IsTokenValid', {token})
                .then(result => {
                    if (result.data.status){
                        authContext.login(token);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },[authContext])

    return <div className={([classes.container, classes[appContext.themeMode]]).join(' ')}>
        <Header></Header>
        <div className={classes.mainBody}>
            {props.children}
        </div>
        {isLoading && <Loading></Loading>}
    </div>
}

export default Layout;