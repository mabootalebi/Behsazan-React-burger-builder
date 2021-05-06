import React from 'react';
import classes from './Button.module.css';

export default function Button(props){
    const classesname = [];
    if (props.disabled){
        classesname.push(classes.disable);
    }
    else{
        classesname.push(classes[props.classnames]);
    }
    classesname.push(classes.container);
    
    return <button {...props} className={classesname.join(' ')} onClick={props.onClick}>
        {props.title}
    </button>
}