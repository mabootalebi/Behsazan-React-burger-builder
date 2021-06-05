import React from 'react';
import classes from './Input.module.css';

export default function Input(props){

    const pureProps = {...props};
    delete pureProps.validate;

    return <>
        <div className={classes.label}>
            {props.required && <span className={classes.dangerNotify}>* </span>}
            <span>{props.label}</span>
        </div>
        <div className={classes.input}>
            <input {...pureProps} />
        </div>
        {props.errormessage && <div className={classes.dangerNotify}>
            <span>{props.errormessage}</span>
        </div>
        }
    </>
}