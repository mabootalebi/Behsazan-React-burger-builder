import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../Context/ApplicationContext';
import Header from './Header/Header';
import classes from './Layout.module.css';
import axios from '../../Tools/fetch'
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import {useSelector} from 'react-redux';
import Loading from '../UI/Loading/Loading';
import MessageModal from '../UI/MessageModal/MessageModal';

function Layout(props){
    const appContext = useContext(ApplicationContext);
    const authContext = useContext(AuthenticationContext);

    const isLoading = useSelector(Store => Store.loading);
    const messageModal = useSelector(store => store.massageModal);

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
        {isLoading && <Loading />}
        {messageModal && messageModal.title && <MessageModal 
                                    Type={messageModal.type} 
                                    Context={messageModal.context} 
                                    Title={messageModal.title}/> }
    </div>
}

export default Layout;