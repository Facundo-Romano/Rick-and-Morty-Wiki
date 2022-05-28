import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';

export default function CharacterCard({ character, navigation }) {
  const darkTheme = useTheme();
  const window = useWindowDimensions();

  return (
    <TouchableOpacity 
        onPress={() => navigation.navigate('CharacterDetail', {id: character.id})}
        style={[
          styles.bigContainer, 
          { width: window.width - window.width/7,
            minhHeight: window.height/5, 
            backgroundColor: darkTheme ? constants.color_1 : constants.color_5}]}>
      <Image 
        style={{width: window.height/6, minHeight: window.height/6, height: '100%'}} 
        source={{uri: character.image}}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={[styles.title, {color: darkTheme ? constants.color_4 : constants.color_0}]}>{ character.name }</Text>
        <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>{ character.status } - { character.species }</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: 450,
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
    fontWeight: '700',
    width: '100%',
    marginVertical: 12
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    width: '100%'
  }
});
