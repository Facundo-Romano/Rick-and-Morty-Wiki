import React from 'react';
import './switchStyles.css';
import { useThemeUpdate } from '../../context/ThemeContext';

export default function SwitchStyles({ change }) {

    const changeTheme = useThemeUpdate();

    return (
        <div className="switch">
            <input type="checkbox" onClick={() => changeTheme()}/>
            <div className="left"/>
            <div className="right"/>
            <div className="switcher"/>
        </div>
    )
};