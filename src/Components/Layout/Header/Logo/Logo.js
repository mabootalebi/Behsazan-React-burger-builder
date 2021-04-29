import React from 'react';
import LogoImg from './Logo.png';
import classes from './Logo.module.css';

export default function Logo(){
    return <img src={LogoImg} className={classes.logo} alt="logo" />
}