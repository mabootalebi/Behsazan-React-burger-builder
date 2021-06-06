import React from 'react';
import { useSelector } from 'react-redux';
import { useReduxDispatch } from '../../../Hooks/useReduxDispatch';
import classes from './Counter.module.css';

function Counter({label}){

    const dispatch = useReduxDispatch();
    const count = useSelector(store => store.burgerBuilder[label.toLowerCase()]);

    const decrease = () =>{        
        if (count > 0){
            dispatch.ChangeOrderDetail(label.toLowerCase(),"subtract");
        }
    }
    
    const increase = () =>{
        if (count < 3){
            dispatch.ChangeOrderDetail(label.toLowerCase(),"add");
        }
    }

    return <div className={classes.container}>
                <span className={classes.label}>{label}:</span>
                <button className={classes.button} onClick={decrease}> - </button>
                <span>{count}</span>
                <button className= {classes.button} onClick={increase}> + </button>
            </div>   
}

export default React.memo(Counter);