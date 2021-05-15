import React from 'react';
import classes from './ThemeButton.module.css';

export default function ThemeButton(props){

    return <button className={([classes.container, classes[props.classNames]]).join(' ')} onClick={props.handleChangeTheme}>
        <span className={classes.themeTitle}>{props.themeName}</span>
    </button>
}