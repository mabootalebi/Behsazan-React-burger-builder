import React, { useContext, useState } from 'react';
import classes from './Login.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import useInput from '../../Hooks/useInput';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import { ApplicationContext } from '../../Context/ApplicationContext';
import { useAxios } from '../../Hooks/useAxios';

export default function Login(props){
    const authContext = useContext(AuthenticationContext);
    const appContext = useContext(ApplicationContext);

    const [message,setMessage] = useState('');
    const [messageType,setMessageType] = useState('');
    const userName = useInput('',true);
    const password = useInput('',true);
    
    const axiosPost = useAxios();

    const handleLogin = (e) =>{
        e.preventDefault();
        
        if (userName.validate() && password.validate()){        
            axiosPost.post('User/Login', {
                username:userName.value,
                password:password.value
            }).then(result => {
                if (!result.status){
                    setMessageType('error');    
                    setMessage(result.message);                
                }
                else{
                    authContext.login(result.message);
                    props.history.push('/BurgerBuilder',props.location.state);
                }
            }).catch(err =>{
                setMessageType('error');    
                setMessage(err);
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