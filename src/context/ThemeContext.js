import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme(){
    return useContext(ThemeContext)
};

export function useThemeUpdate(){
    return useContext(ThemeUpdateContext)
};

export function ThemeProvider({children}) {
    const [darkTheme, setDarkTheme] = useState(true);

    function changeTheme() {
        setDarkTheme(!darkTheme)
    };

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={() => changeTheme()}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}