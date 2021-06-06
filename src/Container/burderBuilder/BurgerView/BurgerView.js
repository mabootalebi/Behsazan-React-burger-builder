import React from 'react';
import { useSelector } from 'react-redux';
import classes from './BurgerView.module.css'

function BurgerView(props){

    const meat = useSelector(store => store.burgerBuilder.meat);
    const cheese = useSelector(store => store.burgerBuilder.cheese);
    const lettuce = useSelector(store => store.burgerBuilder.lettuce);

    const meats = [];
    const cheeses = [];
    const lettuces = [];

    for(let i=0; i<cheese; i++){
        cheeses.push(<div key={i} className={classes.cheese}></div>);
    }

    for(let i=0; i<meat; i++){
        meats.push(<div key={i} className={classes.meat}></div>);
    }

    for(let i=0; i<lettuce; i++){
        lettuces.push(<div key={i} className={classes.lettuce}></div>);
    }

    return <div className={classes.container}>
                <div className={classes.topBread}></div>
                {cheeses}
                {meats}
                {lettuces}
                <div className={classes.bottomBread}></div>
           </div>
}

export default React.memo(BurgerView);