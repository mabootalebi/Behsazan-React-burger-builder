import React from 'react';
import BurgerView from './BurgerView/BurgerView';
import classes from './BurgerBuilder.module.css';
import Counter from './Counter/Counter';
import TotalAmount from './TotalAmount/TotalAmount';
import Button from '../../Components/UI/Button/Button';
import axios from '../../Tools/fetch';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';
import Loading from '../../Components/UI/Loading/Loading';

class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        
        this.state= this.initialState;
    }

    initialState = {
        meat:0,
        cheese:0,
        lettuce:0,
        message: '',
        messageType: '',
        submitting: false
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

        if (meat + cheese + lettuce === 0){
            this.setState({
                message: 'Please Select Detail',
                messageType: 'warning'
            });            
        }
        else {
            this.displayMessages('info', 'Sending Request...');
            this.changeSubmittingState(true);

            axios.post('order/addorder',{
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
                    this.changeSubmittingState(false);
                }
            }).catch(result =>{
                this.displayMessages('error',result);
                this.changeSubmittingState(false);                
            })
        }        
    }

    displayMessages = (messageType, messageContent) => {
        this.setState({
            messageType: messageType,
            message: messageContent            
        })
    }

    changeSubmittingState = (submitting) => {
        this.setState({ submitting: submitting })
    }

    render(){
        const {meat,cheese,lettuce,message,messageType,submitting} = this.state;

        return <div className={classes.container}>
            <BurgerView meat={meat} cheese={cheese} lettuce={lettuce}></BurgerView>
            <Counter label="Cheese" count={cheese} onChange={this.handleChange}></Counter>
            <Counter label="Meat" count={meat} onChange={this.handleChange}></Counter>
            <Counter label="Lettuce" count={lettuce} onChange={this.handleChange}></Counter>
            <TotalAmount totalAmount={this.calculateTotalAmount()}></TotalAmount>
            <div>
                <Button title="Reset" disabled={submitting} classnames="rejectButton" onClick={this.resetOrders}></Button>
                <Button title="Order" disabled={submitting} classnames="confirmButton" onClick={this.registerOrder}></Button>
            </div>

            {messageType && <MessageBox messageType={messageType} message={message}></MessageBox>}
            {submitting && <Loading></Loading>}
        </div>
    }
}

export default BurgerBuilder;