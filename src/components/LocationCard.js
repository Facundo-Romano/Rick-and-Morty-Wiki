import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';

export default function LocationCard({ location, navigation }) {
  const darkTheme = useTheme();
  const window = useWindowDimensions();

  return (
    <TouchableOpacity 
        onPress={() => navigation.navigate('LocationDetail', {id: location.id})}
        style={[
            styles.bigContainer, 
            { width: window.width - window.width/7,
            minhHeight: window.height/5, 
            backgroundColor: darkTheme ? constants.color_1 : constants.color_5}
        ]}>
        <Text style={[styles.title, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
                { location.name }
        </Text>
        <View style={styles.line}/>
        <View style={styles.subContainer}>
            <View style={styles.container}>
                <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
                    Type - { location.type }
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
                    Dimension - { location.dimension }
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: 450,
    marginVertical: 16,
    padding: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
  },
  container: {
      width: '45%',
      paddingRight: 12
  },
  line:{
      height: 5,
      width: '75%',
      backgroundColor: constants.color_3,
      marginTop: 4,
      marginBottom: 12,
  },
  detailsContainer: {
      width: '45%'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    marginVertical: 8,
    lineHeight: 26,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
    marginVertical: 2,
    lineHeight: 26,
  }
});