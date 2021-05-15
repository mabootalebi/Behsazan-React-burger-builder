import React, { createContext, useState } from 'react';

export const ApplicationContext = createContext({
    themeMode: 'light',
    darkTheme: ()=>{},
    lightTheme: ()=>{}
});

export function ApplicationProvider (props){
    const [themeMode, setThemeMode] = useState('light');

    const darkTheme = () => {
        setThemeMode('dark')
    }

    const lightTheme = () => {
        setThemeMode('light')
    }

    return <ApplicationContext.Provider value={{themeMode, darkTheme, lightTheme}}>
        {props.children}
    </ApplicationContext.Provider>
}