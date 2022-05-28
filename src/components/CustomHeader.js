import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import constants from '../css/constants';
import SwitchStyles from './SwitchStyles';
import { useTheme } from '../context/ThemeContext';

export default function CustomHeader() {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const darkTheme = useTheme();

    return (
        <View style={[styles.container,{backgroundColor: darkTheme? constants.color_4 : constants.color_0}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Characters')}>
                <Image style={styles.img} source={require('../../assets/custom/portal.png')}  resizeMode="cover"/>
            </TouchableOpacity>
            <View style={[styles.smallContainer, {width: window.width - 91}]}>   
                <Text style={[styles.title, { color: darkTheme ? constants.color_0 : constants.color_4 }]}>
                    Rick & Morty Wiki
                </Text>
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
        height: '100%',
        width: '100%'
    },
    img: {
        width: 50,
        height: 50,
        marginHorizontal: 16
    },
    smallContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingRight: 25
    }
});