import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function Card({ character }) {
  
  const window = useWindowDimensions();

  return (
    <View style={[
        styles.bigContainer, 
        { width: window.width - window.width/6,
          minhHeight: window.height/5 }]}>
      <Image 
        style={{width: window.height/6, height: window.height/6}} 
        source={{uri: character.image}}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={ styles.title }>{ character.name }</Text>
        <Text style={styles.text}>{ character.status } - { character.species }</Text>
        {/* <View style={ styles.smallContainer }>
          <Text>Last known location: </Text>
          <Text>{ character.location.name }</Text>
        </View>
        <View style={ styles.smallContainer }>
          <Text>First seen in episode: { character.episode[0].match(/\d+/) }</Text>
        </View> */}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 16,
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '45%',
    marginLeft: '8%',
    marginRight: '2%',
  },
  title: {
    fontSize: 18,
    width: '100%',
    marginVertical: 12
  },
  text: {
    width: '100%'
  }
});