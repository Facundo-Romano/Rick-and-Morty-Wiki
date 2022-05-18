import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import constants from '../constants';
import SwitchStyles from './switchStyles/SwitchStyles';
import { useTheme } from '../context/ThemeContext';

export default function CustomHeader() {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const darkTheme = useTheme();

    return (
        <View style={[  styles.container, 
                        {minHeight: window.height/12, 
                        width: window.width, 
                        backgroundColor: darkTheme? constants.color_4 : constants.color_0 
                        }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Characters')}>
                <Image style={styles.img} source={require('../../assets/portal.png')}  resizeMode="cover"/>
            </TouchableOpacity>
            <View style={styles.smallContainer}>   
                <Text style={[styles.title, { color: darkTheme ? constants.color_0 : constants.color_4 }]}>Rick & Morty Wiki</Text>
                <SwitchStyles/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    img: {
        width: 50,
        height: 50,
        marginHorizontal: 16
    },
    smallContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 12
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingRight: 25
    }
});