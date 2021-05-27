import React from 'react';
import BurgerView from './BurgerView/BurgerView';
import classes from './BurgerBuilder.module.css';
import Counter from './Counter/Counter';
import TotalAmount from './TotalAmount/TotalAmount';
import Button from '../../Components/UI/Button/Button';
import axios from '../../Tools/fetch';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import {connect} from 'react-redux';
import * as loadingActionTypes from '../../Store/loading/loadingActionTypes';

class BurgerBuilder extends React.Component{

    static contextType = AuthenticationContext;

    constructor(props){
        super(props);
        
        this.state= this.initialState;
    }

    locationState = this.props.location.state;

    initialState = {
        meat: this.locationState != null? this.locationState.meat:0,
        cheese:this.locationState != null? this.locationState.cheese:0,
        lettuce:this.locationState != null? this.locationState.lettuce:0,
        message: '',
        messageType: ''
    }  

    handleChange = (label,mode) => {
        // Close Message Box
        this.displayMessages('','');

        this.setState(currentState => {
            return {
                [label.toLowerCase()]: currentState[label.toLowerCase()] + (mode === 'add'? 1: -1)
            }
        })
    }

    resetOrders = () =>{
        this.setState(()=>this.initialState)
    }

    calculateTotalAmount = () => {
        const {meat,cheese,lettuce} = this.state;

        const meatPrice = meat * 5000;
        const cheesePrice = cheese * 4000;
        const lettucePrice = lettuce * 2000;
        const basicPrice = 5000;

        return basicPrice + meatPrice + cheesePrice + lettucePrice;
    }

    registerOrder = () => {        
        const {meat,cheese,lettuce} = this.state;

        if (!this.context.isLogin){
            this.displayMessages('error', 'You must Login first. Redirecting to Login page...');
            setTimeout(()=> {
                this.props.history.push('/Login', {meat, cheese, lettuce});
                return;
            }, 2000)            
        }

        else if (meat + cheese + lettuce === 0){
            this.setState({
                message: 'Please Select Detail',
                messageType: 'warning'
            });            
        }
        else {
            this.displayMessages('info', 'Sending Request...');
            this.props.DisplayLoading();

            axios.post('safeorder/addorder',{
                meat:meat,
                cheese:cheese,
                salad:lettuce,
                total_price:this.calculateTotalAmount()
        }).then(result => {
                if(result.data.status){
                    this.setState({
                        ...this.initialState
                    });
                    this.displayMessages('success', `Your order successfully registered. Order number is: ${result.data.order_number}`);                    
                }
                else{
                    this.displayMessages('error',`Something goes wrong. Error Message: ${result.data.message}`);
                }                
                this.props.HideLoading();
            }).catch(result =>{
                this.displayMessages('error',result);
                this.props.HideLoading();
            })
        }        
    }

    displayMessages = (messageType, messageContent) => {
        this.setState({
            messageType: messageType,
            message: messageContent            
        })
    }

    render(){
        const {meat,cheese,lettuce,message,messageType} = this.state;

        return <div className={classes.container}>
            <BurgerView meat={meat} cheese={cheese} lettuce={lettuce}></BurgerView>
            <Counter label="Cheese" count={cheese} onChange={this.handleChange}></Counter>
            <Counter label="Meat" count={meat} onChange={this.handleChange}></Counter>
            <Counter label="Lettuce" count={lettuce} onChange={this.handleChange}></Counter>
            <TotalAmount totalAmount={this.calculateTotalAmount()}></TotalAmount>
            <div>
                <Button title="Reset" classnames="rejectButton" onClick={this.resetOrders}></Button>
                <Button title="Order" classnames="confirmButton" onClick={this.registerOrder}></Button>
            </div>
            {messageType && <MessageBox messageType={messageType} message={message}></MessageBox>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return{
        Loading: state.Loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        DisplayLoading: () => {
            dispatch({type: loadingActionTypes.Loading})
        },

        HideLoading: () => {
            dispatch({type: loadingActionTypes.UnLoading})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);