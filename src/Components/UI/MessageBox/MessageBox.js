import React from 'react';
import classes from './MessageBox.module.css';

export default function MessageBox(props){

    if (!props.messageType)
        return null;

    return <div className={([classes.messageBox, classes[props.messageType]]).join(' ')}>
    <span>{props.message}</span>
</div>
}