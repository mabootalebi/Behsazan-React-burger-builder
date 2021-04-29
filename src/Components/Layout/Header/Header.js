import React from 'react';
import classes from './Header.module.css';
import Logo from './Logo/Logo';
import AccountBottons from './AccountBottons/AccountBottons';
import Tabs from './Tabs/Tabs';

export default function Header(props){
    return <div className={classes.container}>
        <AccountBottons></AccountBottons>
        <Logo></Logo>
        <Tabs></Tabs>
    </div>
}