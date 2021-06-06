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

class BurgerBuilder extends React.PureComponent{

    static contextType = AuthenticationContext;

    constructor(props){
        super(props);
    }

    resetOrders = () =>{
        this.props.ResetOrder();
    }

    calculateTotalAmount = () => {
        const {meat,cheese,lettuce} = this.props.burgerBuilder;

        const meatPrice = meat * 5000;
        const cheesePrice = cheese * 4000;
        const lettucePrice = lettuce * 2000;
        const basicPrice = 5000;

        return basicPrice + meatPrice + cheesePrice + lettucePrice;
    }

    registerOrder = () => {        
        const {meat,cheese,lettuce} = this.props.burgerBuilder;

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
                    this.props.DisplayModalMessage('success', 'Order successfully registered', `Your order number is: ${result.data.order_number}`);
                    this.resetOrders();
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
        return <div className={classes.container}>
            <BurgerView/>
            <Counter label="Cheese"></Counter>
            <Counter label="Meat"></Counter>
            <Counter label="Lettuce"></Counter>
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
        massageModal: state.massageModal,
        burgerBuilder: state.burgerBuilder
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
        },    
        ResetOrder: () => {
            dispatch({
                type: ActionTypes.ResetOrder
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);