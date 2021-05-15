import React from 'react';
import classes from './Loading.module.css';

export default function Loading(){
    return <div className={classes.container}>
        <div className={classes.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
}