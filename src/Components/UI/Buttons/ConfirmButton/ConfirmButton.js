import React from 'react';
import classes from './ConfirmButton.module.css';

export default function ConfirmButton(props){
    return <button className={classes.container} onClick={props.onClick}>
        {props.title}
    </button>
}