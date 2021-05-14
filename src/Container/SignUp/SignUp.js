import React from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './SignUp.module.css';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import axios from '../../Tools/fetch';

export default class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = this.initialState;
    }

     initialState = {
        username: '',
        password:'',
        confirmPassword:'',
        fullName:'',
        email:'',
        
        usernameErrorMessage: '',
        passwordErrorMessage:'',
        confirmPasswordErrorMessage:'',
        fullNameErrorMessage:'',
        emailErrorMessage:'',

        message:'',
        messageType:'',
        submitting: false
    };

    handleChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.validateInputs(e.target.name,e.target.value);
    }

    validateInputs = (inputName, inputValue) => {
        switch (inputName){
            case 'username':
                if (inputValue.length < 2){
                    this.setState({
                        usernameErrorMessage: 'Username must contain at least 2 characters.'                      
                    })
                }
                else{
                    this.setState({usernameErrorMessage: ''})
                }
                break;
            case 'password':
                // contains upper/lower case letters and digits
                const passwordRegex = /^[A-Za-z0-9]+$/
                if (inputValue.length < 5 || !passwordRegex.test(inputValue)){
                    this.setState({
                        passwordErrorMessage: 'Password must contain at least 5 characters, including UpperCase/LowerCase letters or digits.'
                    })
                }
                else{
                    this.setState({passwordErrorMessage: ''})
                }
                break;
            case 'confirmPassword':
                if (inputValue !== this.state.password){
                    this.setState({
                        confirmPasswordErrorMessage: 'Password and Confirm Password are not matched.'
                    })
                }
                else{
                    this.setState({confirmPasswordErrorMessage: ''})
                }
                break;
            case 'fullName':
                if (inputValue.length === 0){
                    this.setState({
                        fullNameErrorMessage: 'Please enter fullName.'
                    })
                }
                else{
                    this.setState({fullNameErrorMessage: ''})
                }
                break;
            case 'email':
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                if (!emailRegex.test(String(inputValue).toLowerCase())){
                    this.setState({
                        emailErrorMessage: 'Invalid email eddress'
                    })
                }
                else{
                    this.setState({emailErrorMessage: ''})
                }
                break;
            default:
                this.setState({
                    usernameErrorMessage:'',
                    passwordErrorMessage:'',
                    confirmPasswordErrorMessage:'',
                    fullNameErrorMessage:'',
                    emailErrorMessage: ''                    
                })
                break;
        }
    }

    canSubmit = () => {
        const {usernameErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage, fullNameErrorMessage, emailErrorMessage} = this.state;
        return usernameErrorMessage === '' &&
               passwordErrorMessage === '' &&
               confirmPasswordErrorMessage === '' &&
               fullNameErrorMessage === '' &&
               emailErrorMessage === '';
    }

    signUp = (e) => {
        e.preventDefault();
        const canSubmit = this.canSubmit();
        if (!canSubmit){            
            this.setState({
                message: 'Cannot Submit form. Resolve all errors.',
                messageType: 'error'
            })
        }
        else{
            const {username,password,fullName,email} = this.state;
            this.setState({submitting:true});
            axios.post('/user/signup', {
                username:username,
                password:password,
                fullname:fullName,
                email:email
            }).then(result => {
                this.setState({
                    ...this.initialState,
                    messageType: result.data.status? 'success': 'error',
                    message: result.data.message,
                    submitting:false
                })                
            }).catch(err =>{
                this.setState({
                    messageType: 'error',
                    message: err,
                    submitting:false
                })
            })
        }
    }

    render(){
        const {username, password, confirmPassword, fullName, email} = this.state;
        const {usernameErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage, fullNameErrorMessage, emailErrorMessage} = this.state;
        const {message, messageType,submitting} = this.state;

        return <form onSubmit={this.signUp}>
            <div className={classes.container}>
                <div className={classes.formLabel}>
                    <span> SignUp</span>
                </div>
                <Input required label="Username" type="text" name="username" onChange={this.handleChangeInput} value={username} errorMessage={usernameErrorMessage}></Input>
                <Input required label="Password" type="password" name="password" onChange={this.handleChangeInput} value={password} errorMessage={passwordErrorMessage}></Input>
                <Input required label="Confirm Password" type="password" name="confirmPassword" onChange={this.handleChangeInput} value={confirmPassword} errorMessage={confirmPasswordErrorMessage}></Input>
                <Input required label="FullName" type="text" name="fullName" onChange={this.handleChangeInput} value={fullName} errorMessage={fullNameErrorMessage}></Input>
                <Input required label="Email" type="email" name="email" onChange={this.handleChangeInput} value={email} errorMessage={emailErrorMessage}></Input>
                <div className={classes.submitButton}>
                    <Button disabled={submitting} title="Submit" classnames="confirmButton"></Button>
                </div>

                {messageType && <MessageBox message={message} messageType={messageType}></MessageBox>}
            </div>
        </form>
    }
}