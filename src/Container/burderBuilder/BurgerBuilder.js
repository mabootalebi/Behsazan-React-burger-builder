import React from 'react';
import BurgerView from './BurgerView/BurgerView';
import classes from './BurgerBuilder.module.css';
import Counter from './Counter/Counter';
import TotalAmount from './TotalAmount/TotalAmount';
import ConfirmButton from '../../Components/UI/Buttons/ConfirmButton/ConfirmButton';
import RejectButton from '../../Components/UI/Buttons/RejectButton/RejectButton';

class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            meat:0,
            cheese:0,
            lettuce:0
        };
    }

    handleChange = (label,mode) => {

        this.setState(currentState => {
            return {
                [label.toLowerCase()]: currentState[label.toLowerCase()] + (mode === 'add'? 1: -1)
            }
        })
    }

    resetOrders = () =>{
        this.setState(()=>{
            return{
                meat:0,
                cheese:0,
                lettuce:0
            }
        })
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
                <RejectButton title="Reset" onClick={this.resetOrders}></RejectButton>
                <ConfirmButton title="Order" onClick={null}></ConfirmButton>                
            </div>
        </div>
    }
}

export default BurgerBuilder;