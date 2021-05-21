import React from 'react';
import classes from './AccessDenied.module.css';

export default function AccessDenied(){
    return <>
    <div className={classes.statusCode}>
        403
    </div>
    <div className={classes.message}>
        Access Denied / Forbidden
    </div>
    </>
}