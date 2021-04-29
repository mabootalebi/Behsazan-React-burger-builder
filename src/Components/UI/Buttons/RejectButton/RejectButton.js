import React from 'react';
import classes from './RejectButton.module.css';

export default function RejectButton(props){
    return <button className={classes.container} onClick={props.onClick}>
        {props.title}
    </button>
}