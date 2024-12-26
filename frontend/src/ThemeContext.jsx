import {useContext,createContext,useState} from 'react';

export const ThemeContext=createContext();

export function ThemeContextProvider({children}){
    const [isDarkMode,setisDarkMode]=useState(false);
    const themetoggle=()=>{
        setisDarkMode(prevmode=>!prevmode)
    }
    return (
        <ThemeContext.Provider value={{isDarkMode,setisDarkMode,themetoggle}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme=()=>{
    return useContext(ThemeContext);
}