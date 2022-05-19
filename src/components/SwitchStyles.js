import React from 'react';
import { useThemeUpdate, useTheme } from '../context/ThemeContext';
import { TouchableOpacity, Image } from 'react-native';

export default function SwitchStyles() {
    const changeTheme = useThemeUpdate();
    const darkTheme = useTheme();

    return (
        <TouchableOpacity onPress={() => changeTheme()}>
            {
                darkTheme ? 
                <Image 
                    style={{width: 30, height: 30, backgroundColor: 'white', borderRadius: 15}} 
                    source={require('../../assets/custom/moon.png')}  
                    resizeMode="cover"  
                    /> :
                <Image
                    style={{width: 30, height: 30, backgroundColor: 'black', borderRadius: 15}} 
                    source={require('../../assets/custom/sun.png')}  
                    resizeMode="cover" />
            }
        </TouchableOpacity>
    )
};