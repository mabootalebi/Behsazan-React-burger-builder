import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';
import TabLink from '../../../UI/TabLink/TabLink';
import classes from './Tabs.module.css';

export default function Tabs(){
    const authContext = useContext(AuthenticationContext);

    return <div className={classes.container}>
        <TabLink to="/BurgerBuilder" >Burger Builder</TabLink>
        {authContext.isLogin && <TabLink to="/OrderList">Order List</TabLink>}
    </div>
}