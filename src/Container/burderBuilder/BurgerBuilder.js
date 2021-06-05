import React from 'react';
import BurgerView from './BurgerView/BurgerView';
import classes from './BurgerBuilder.module.css';
import Counter from './Counter/Counter';
import TotalAmount from './TotalAmount/TotalAmount';
import Button from '../../Components/UI/Button/Button';
import axios from '../../Tools/fetch';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import {connect} from 'react-redux';
import * as ActionTypes from '../../Store/ActionTypes';

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
        lettuce:this.locationState != null? this.locationState.lettuce:0,    }  

    handleChange = (label,mode) => {
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
            this.props.DisplayModalMessage('error', 'Not Authorized', 'You must Login first. Redirecting to Login page...');            
            setTimeout(()=> {
                this.props.history.push('/Login', {meat, cheese, lettuce});
                this.props.HideModalMessage();
                return;
            }, 2000)            
        }

        else if (meat + cheese + lettuce === 0){        
            this.props.DisplayModalMessage('warning', 'Add Order Failed', 'Please Select Detail');
        }
        else {
            this.props.DisplayModalMessage('info', 'Sending', 'Sending Request...');
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
                    this.props.DisplayModalMessage('success', 'Order successfully registered', `Your order number is: ${result.data.order_number}`);                    
                }
                else{
                    this.props.DisplayModalMessage('error','Error',`Something goes wrong. Error Message: ${result.data.message}`);
                }                
                this.props.HideLoading();
            }).catch(result =>{
                this.props.DisplayModalMessage('error','Error',result);
                this.props.HideLoading();
            })
        }        
    }

    render(){
        const {meat,cheese,lettuce} = this.state;

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
        </div>
    }
}

const mapStateToProps = (state) => {
    return{
        Loading: state.Loading,
        massageModal: state.massageModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        DisplayLoading: () => {
            dispatch({type: ActionTypes.Loading})
        },

        HideLoading: () => {
            dispatch({type: ActionTypes.UnLoading})
        },

        DisplayModalMessage: (messageType, messageTitle, messageContext) => {
            dispatch({
                type: ActionTypes.DisplayModalMessage,
                payLoad: {
                    messageType: messageType,
                    messageContext: messageContext,
                    messageTitle: messageTitle
                }
            })
        },    
        HideModalMessage: () => {
            dispatch({
                type: ActionTypes.HideModalMessage
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);