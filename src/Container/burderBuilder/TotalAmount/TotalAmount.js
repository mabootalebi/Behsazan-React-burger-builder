import React from 'react';
import classes from './TotalAmount.module.css';

export default function TotalAmount(props){
    const meatPrice = 4;
    const cheesePrice = 3;
    const lettucePrice = 1;
    const basicPrice = 2;

    const totalAmount = basicPrice +
                        meatPrice * props.meat +
                        cheesePrice * props.cheese +
                        lettucePrice * props.lettuce;

    return <div className={classes.container}>
        <span> Total Amount : {totalAmount} $ </span>        
    </div>
}
