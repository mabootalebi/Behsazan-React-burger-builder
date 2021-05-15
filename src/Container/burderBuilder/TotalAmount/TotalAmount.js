import React, { useContext } from 'react';
import { ApplicationContext } from '../../../Context/ApplicationContext';
import classes from './TotalAmount.module.css';

export default function TotalAmount(props){
    const appContext = useContext(ApplicationContext);

    return <div className={([classes.container,classes[appContext.themeMode]]).join(' ')}>
        <span> Total Amount : {props.totalAmount} <i>T</i> </span>        
    </div>
}
