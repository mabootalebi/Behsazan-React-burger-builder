import React, { createContext, useState } from 'react';



export const AuthenticationContext = createContext({
    isLogin: false,
    login: () => {},
    logout: () => {}
});

export function AuthenticationProvider(props) {
    const [isLogin, setIsLogin] = useState(false);

    const login = () => {
        setIsLogin(true);
    }

    const logout = () => {
        setIsLogin(false);
    }

    return <AuthenticationContext.Provider value={{isLogin,login,logout}}>
        {props.children}
    </AuthenticationContext.Provider>
}