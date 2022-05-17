import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Card({ character }) {
  return (
    <View style={ styles.bigContainer }>
      <Image style={ styles.img } source={ character.image }  resizeMode="cover"/>
      <View style={ styles.container }>
        <View>
          <Text style={ styles.title }>{ character.name }</Text>
          <Text>{ character.status } - { character.species }</Text>
        </View>
        <View style={ styles.smallContainer }>
          <Text>Last known location: </Text>
          <Text>{ character.location.name }</Text>
        </View>
        <View style={ styles.smallContainer }>
          <Text>First seen in episode: { character.episode[0].match(/\d+/) }</Text>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
});