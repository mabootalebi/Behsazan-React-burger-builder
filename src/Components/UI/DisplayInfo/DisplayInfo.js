import React from 'react';
import classes from './DisplayInfo.module.css';

export default function DisplayInfo(props){

    return <div className={classes.container}>        
        <span>{props.Label}: </span>        
        <span>{props.Information}</span>        
    </div>
}