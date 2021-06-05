import React, { useContext } from 'react';
import classes from './Login.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import useInput from '../../Hooks/useInput';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import { ApplicationContext } from '../../Context/ApplicationContext';
import { useAxios } from '../../Hooks/useAxios';
import { useReduxDispatch } from '../../Hooks/useReduxDispatch';

export default function Login(props){
    const authContext = useContext(AuthenticationContext);
    const appContext = useContext(ApplicationContext);

    const userName = useInput('',true);
    const password = useInput('',true);
    
    const axiosPost = useAxios();
    const dispatch = useReduxDispatch();

    const handleLogin = (e) =>{
        e.preventDefault();
        
        if (userName.validate() && password.validate()){        
            axiosPost.post('User/Login', {
                username:userName.value,
                password:password.value
            }).then(result => {
                if (!result.status){
                    dispatch.DisplayModalMessage('error', 'Login failed', result.message);         
                }
                else{
                    authContext.login(result.message);
                    props.history.push('/BurgerBuilder',props.location.state);
                }
            }).catch(err =>{
                dispatch.DisplayModalMessage('error', 'Login failed', err);
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
            </div>
        </form>
}