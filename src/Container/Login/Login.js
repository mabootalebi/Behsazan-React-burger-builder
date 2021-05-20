import React, { useContext, useState } from 'react';
import classes from './Login.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import useInput from '../../Hooks/useInput';
import axios from '../../Tools/fetch';
import Loading from '../../Components/UI/Loading/Loading';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import { ApplicationContext } from '../../Context/ApplicationContext';

export default function Login(props){
    const authContext = useContext(AuthenticationContext);
    const appContext = useContext(ApplicationContext);

    const [submitting,setSubmitting] = useState(false);
    const [message,setMessage] = useState('');
    const [messageType,setMessageType] = useState('');
    const userName = useInput('',true);
    const password = useInput('',true);
    
    const handleLogin = (e) =>{
        e.preventDefault();
        
        if (userName.validate() && password.validate()){        

            setSubmitting(true);
            axios.post('User/Login', {
                username:userName.value,
                password:password.value
            }).then(result => {
                if (!result.data.status){
                    setMessageType('error');    
                    setMessage(result.data.message);                
                }
                else{
                    authContext.login();
                    window.localStorage.setItem('token', result.data.message);
                    props.history.push('/BurgerBuilder',props.location.state);
                }
                setSubmitting(false);
            }).catch(err =>{
                setMessageType('error');    
                setMessage(err);
                setSubmitting(false);
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
                    <Button disabled={submitting} title="Submit" classnames="confirmButton"></Button>
                </div>

                {messageType && <MessageBox message={message} messageType={messageType}></MessageBox>}
                {submitting && <Loading></Loading>}
            </div>
        </form>
}