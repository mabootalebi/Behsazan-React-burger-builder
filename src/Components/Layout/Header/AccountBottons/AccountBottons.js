import React, { useContext } from 'react';
import { ApplicationContext } from '../../../../Context/ApplicationContext';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';
import TabLink from '../../../UI/TabLink/TabLink';
import ThemeButton from '../ThemeButton/ThemeButton';
import classes from './AccountBottons.module.css';

export default function AccountBottons(){
    const authContext = useContext(AuthenticationContext);
    const appContext = useContext(ApplicationContext);

    const handleLogoutClick = () => {
        authContext.logout();
    }

    const handleChangeTheme = () =>{
        if(appContext.themeMode === 'dark')
            appContext.lightTheme();
        else
            appContext.darkTheme();
    }

    return <div className={classes.container}>
        {!authContext.isLogin && <TabLink to="/Login" >Login</TabLink>}
        {!authContext.isLogin && <TabLink to="/SignUp" >SignUp</TabLink>}
        {authContext.isLogin &&  <TabLink to="/" onClick={handleLogoutClick}>Logout</TabLink>}

        {appContext.themeMode === 'dark' && <ThemeButton classNames="light" themeName="Light Theme" handleChangeTheme={handleChangeTheme}></ThemeButton>}
        {appContext.themeMode === 'light' && <ThemeButton classNames="dark" themeName="Dark Theme" handleChangeTheme={handleChangeTheme}></ThemeButton>}

        {authContext.isLogin && authContext.userFullName && <div style={{display:"inline-block",marginLeft:"10px"}}>{authContext.userFullName}</div>}
    </div>
}

