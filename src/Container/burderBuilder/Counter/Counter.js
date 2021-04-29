import React from 'react';
import classes from './Counter.module.css';

export default class Counter extends React.Component{

    decrease = () =>{
        const {label,count} = this.props;
        
        if (count > 0){
            return{
                count: this.props.onChange(label,"subtract")
            }
        }
    }
    
    increase = () =>{
        const {label,count} = this.props;

        if (count < 3){
            return {
                    count: this.props.onChange(label,"add")
            }
        }
    }

    render(){
        const {label, count} = this.props;

        return <div className={classes.container}>
                <span className={classes.label}>{label}:</span>
                <button className={classes.button} onClick={this.decrease}> - </button>
                <span>{count}</span>
                <button className= {classes.button} onClick={this.increase}> + </button>
        </div>
    }
}