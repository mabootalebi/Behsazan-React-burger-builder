import React from 'react';
import classes from './TotalAmount.module.css';

export default function TotalAmount(props){
    return <div className={classes.container}>
        <span> Total Amount : {props.totalAmount} <i>T</i> </span>        
    </div>
}
