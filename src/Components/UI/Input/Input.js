import React from 'react';
import classes from './Input.module.css';

export default function Input(props){

    return <>
        <div className={classes.label}>
            {props.required && <span className={classes.dangerNotify}>* </span>}
            <span>{props.label}</span>
        </div>
        <div className={classes.input}>
            <input {...props} />
        </div>
        {props.errorMessage && <div className={classes.dangerNotify}>
            <span>{props.errorMessage}</span>
        </div>
        }
    </>
}