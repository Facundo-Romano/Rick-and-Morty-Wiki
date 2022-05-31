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
            borderColor: darkTheme ? constants.color_3 : constants.color_1 }]}>
      <Image 
        style={{width: window.height/6, minHeight: window.height/6, height: '100%'}} 
        source={{uri: character.image}}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={[styles.title, {color: darkTheme ? constants.color_3 : constants.color_1}]}>{ character.name }</Text>
        <Text style={[
            styles.textStatus, 
            {
              color: constants['color_' + character.status.toLowerCase()],
              borderColor: constants['color_' + character.status.toLowerCase()]
            }]}>

            { character.status }

        </Text>
        <Text style={[
          styles.textSpecies, 
          { 
            color: constants['color_' + character.species.toLowerCase().replace(/\s/g, "")],
            borderColor: constants['color_' + character.species.toLowerCase().replace(/\s/g, "")]
          }]}>
          { character.species }
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 1, 
    maxWidth: 450,
    marginVertical: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '45%',
    marginLeft: '8%',
    marginRight: '2%',
    marginVertical: '2%'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%'
  },
  textStatus: {
    alignSelf: "flex-start",
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    letterSpacing: 2,
    paddingHorizontal: 4,
    marginVertical: 10
  },
  textSpecies: {
    alignSelf: "flex-start",
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    color: constants.color_3,
    textTransform: 'uppercase',
    letterSpacing: 2,
    maxWidth: '100%',
    paddingHorizontal: 4,
    marginBottom: 10
  }
});
