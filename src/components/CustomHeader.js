import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function CustomHeader() {
    const window = useWindowDimensions();
    return (
        <View style={[styles.container, {minHeight: window.height/12, width: window.width,}]}>
                <Image style={styles.img} source={require('../../assets/rickIcon.png')}  resizeMode="cover"/>
                <Text style={styles.title}>Rick & Morty Wiki</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'

    },
    img: {
        width: 50,
        height: 50,
        marginHorizontal: 16
    },
    title: {
        fontSize: 20
    }
})