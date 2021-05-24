import React from 'react';
import classes from './Button.module.css';
import {useSelector} from 'react-redux';

export default function Button(props){

    const isLoading = useSelector(loadingStore => loadingStore.loading);

    const classesname = [];
    if (isLoading){
        classesname.push(classes.disable);
    }
    else{
        classesname.push(classes[props.classnames]);
    }
    classesname.push(classes.container);
    
    return <button {...props} disabled={isLoading} className={classesname.join(' ')} onClick={props.onClick}>
        {props.title}
    </button>
}