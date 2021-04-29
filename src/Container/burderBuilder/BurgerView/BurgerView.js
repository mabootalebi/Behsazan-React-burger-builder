import React from 'react';
import classes from './BurgerView.module.css'

export default function BurgerView(props){

    const meats = [];
    const cheeses = [];
    const lettuces = [];

    for(let i=0; i<props.cheese; i++){
        cheeses.push(<div className={classes.cheese}></div>);
    }

    for(let i=0; i<props.meat; i++){
        meats.push(<div className={classes.meat}></div>);
    }

    for(let i=0; i<props.lettuce; i++){
        lettuces.push(<div className={classes.lettuce}></div>);
    }

    return <div className={classes.container}>
        <div className={classes.topBread}></div>
        {cheeses}
        {meats}
        {lettuces}
        <div className={classes.bottomBread}></div>
    </div>
}