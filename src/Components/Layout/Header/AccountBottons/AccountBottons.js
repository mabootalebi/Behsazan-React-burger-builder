import React from 'react';
import TabLink from '../../../UI/TabLink/TabLink';
import classes from './AccountBottons.module.css';

export default function AccountBottons(){
    return <div className={classes.container}>
        {/* <TabLink to="/Login" >Login</TabLink> */}
        <TabLink to="/SignUp" >SignUp</TabLink>
    </div>
}

