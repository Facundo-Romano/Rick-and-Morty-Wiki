import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';

export default function Card({ character }) {
  const darkTheme = useTheme();
  const window = useWindowDimensions();

  return (
    <View style={[
        styles.bigContainer, 
        { width: window.width - window.width/6,
          minhHeight: window.height/5, 
          backgroundColor: darkTheme ? constants.color_1 : constants.color_2}]}>
      <Image 
        style={{width: window.height/6, height: window.height/6}} 
        source={{uri: character.image}}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={[styles.title, {color: darkTheme ? constants.color_4 : constants.color_0}]}>{ character.name }</Text>
        <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>{ character.status } - { character.species }</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '45%',
    marginLeft: '8%',
    marginRight: '2%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    width: '100%',
    marginVertical: 12
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    width: '100%'
  }
});
