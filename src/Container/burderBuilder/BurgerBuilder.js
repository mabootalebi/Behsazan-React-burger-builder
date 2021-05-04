import React from 'react';
import BurgerView from './BurgerView/BurgerView';
import classes from './BurgerBuilder.module.css';
import Counter from './Counter/Counter';
import TotalAmount from './TotalAmount/TotalAmount';
import Button from '../../Components/UI/Button/Button';

class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        
        this.state= this.initialState;
    }

    initialState = {
        meat:0,
        cheese:0,
        lettuce:0
    }

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

    render(){
        const {meat,cheese,lettuce} = this.state;

        return <div className={classes.container}>
            <BurgerView meat={meat} cheese={cheese} lettuce={lettuce}></BurgerView>
            <Counter label="Cheese" count={cheese} onChange={this.handleChange}></Counter>
            <Counter label="Meat" count={meat} onChange={this.handleChange}></Counter>
            <Counter label="Lettuce" count={lettuce} onChange={this.handleChange}></Counter>
            <TotalAmount meat={meat} cheese={cheese} lettuce={lettuce}></TotalAmount>
            <div>
                <Button title="Reset" classNames="rejectButton" onClick={this.resetOrders}></Button>
                <Button title="Order" classNames="confirmButton" onClick={null}></Button>
            </div>
        </div>
    }
}

export default BurgerBuilder;