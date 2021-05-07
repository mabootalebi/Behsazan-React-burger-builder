import React from 'react';
import TabLink from '../../../UI/TabLink/TabLink';
import classes from './Tabs.module.css';

export default function Tabs(){
    return <div className={classes.container}>
        <TabLink to="/" >Burger Builder</TabLink>
        <TabLink to="/OrderList" >Order List</TabLink>
    </div>
}