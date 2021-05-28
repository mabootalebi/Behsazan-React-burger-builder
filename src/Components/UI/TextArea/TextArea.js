import React from 'react';
import classes from './TextArea.module.css';

export default function TextArea(props){
    return <div className={classes.container}>
        <div>{props.Label}: </div>
        <div>
            <textarea onChange={props.onChange} value={props.value}>
                {props.value}
            </textarea>
        </div>
    </div>
}