import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';
import TabLink from '../../../UI/TabLink/TabLink';
import classes from './AccountBottons.module.css';

export default function AccountBottons(){
    const authContext = useContext(AuthenticationContext);

    const handleLogoutClick = () => {
        authContext.logout();
    }

    return <div className={classes.container}>
        {!authContext.isLogin && <TabLink to="/Login" >Login</TabLink>}
        {!authContext.isLogin && <TabLink to="/SignUp" >SignUp</TabLink>}
        {authContext.isLogin &&  <TabLink to="/" onClick={handleLogoutClick}>Logout</TabLink>}
    </div>
}

