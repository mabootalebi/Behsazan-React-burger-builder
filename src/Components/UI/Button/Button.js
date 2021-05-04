import React from 'react';
import classes from './Button.module.css';

export default function Button(props){
    const classNames = ([classes[props.classNames], classes.container]).join(' ');
    return <button className={classNames} onClick={props.onClick}>
        {props.title}
    </button>
}