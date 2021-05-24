import React, { useContext, useState } from 'react';
import classes from './Login.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import useInput from '../../Hooks/useInput';
import axios from '../../Tools/fetch';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import { ApplicationContext } from '../../Context/ApplicationContext';
import {useDispatch} from 'react-redux';
import * as loadingActionTypes from '../../Store/loading/loadingActionTypes';

export default function Login(props){
    const authContext = useContext(AuthenticationContext);
    const appContext = useContext(ApplicationContext);

    const [message,setMessage] = useState('');
    const [messageType,setMessageType] = useState('');
    const userName = useInput('',true);
    const password = useInput('',true);
    
    const dispatch = useDispatch();

    const handleLogin = (e) =>{
        e.preventDefault();
        
        if (userName.validate() && password.validate()){        

            dispatch({type: loadingActionTypes.Loading});
            axios.post('User/Login', {
                username:userName.value,
                password:password.value
            }).then(result => {
                if (!result.data.status){
                    setMessageType('error');    
                    setMessage(result.data.message);                
                }
                else{
                    authContext.login(result.data.message);                    
                    props.history.push('/BurgerBuilder',props.location.state);
                }
                dispatch({type: loadingActionTypes.UnLoading});

            }).catch(err =>{
                setMessageType('error');    
                setMessage(err);
                dispatch({type: loadingActionTypes.UnLoading});
            })
        }
    }

    return <form onSubmit={handleLogin}>        
            <div className={([classes.container, classes[appContext.themeMode]]).join(' ')}>
                <div className={classes.formLabel}>
                    <span> Login </span>
                </div>
                <Input required label="Username" type="text" name="username" {...userName}></Input>
                <Input required label="Password" type="password" name="password" {...password}></Input>
                <div className={classes.submitButton}>
                    <Button title="Submit" classnames="confirmButton"></Button>
                </div>

                {messageType && <MessageBox message={message} messageType={messageType}></MessageBox>}
            </div>
        </form>
}