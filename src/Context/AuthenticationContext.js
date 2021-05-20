import jwtDecode from 'jwt-decode';
import React, { createContext, useState } from 'react';


export const AuthenticationContext = createContext({
    isLogin: false,
    userFullName: '',
    login: () => {},
    logout: (token) => {}
});

export function AuthenticationProvider(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [userFullName, setUserFullName] = useState('');


    const login = (token) => {
        if (token){
            window.localStorage.setItem('token', token);
            const payload = jwtDecode(token);
            setUserFullName(payload && payload.fullname);
        }
        setIsLogin(true);
    }

    const logout = () => {
        window.localStorage.removeItem('token');
        setIsLogin(false);
    }

    return <AuthenticationContext.Provider value={{isLogin,login,logout,userFullName}}>
        {props.children}
    </AuthenticationContext.Provider>
}