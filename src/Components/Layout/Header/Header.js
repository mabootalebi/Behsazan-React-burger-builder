import React, { useContext } from 'react';
import classes from './Header.module.css';
import Logo from './Logo/Logo';
import AccountBottons from './AccountBottons/AccountBottons';
import Tabs from './Tabs/Tabs';
import { ApplicationContext } from '../../../Context/ApplicationContext';

export default function Header(props){
    const appContext = useContext(ApplicationContext);
    
    return <div className={([classes.container,classes[appContext.themeMode]]).join(' ')}>
        <AccountBottons></AccountBottons>
        <Logo></Logo>
        <Tabs></Tabs>
    </div>
}