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
            borderColor: darkTheme ? constants.color_3 : constants.color_1}
        ]}>
        <Text style={[styles.title, {color: darkTheme ? constants.color_3 : constants.color_1}]}>
                { location.name }
        </Text>
        <View style={styles.line}/>
        <View style={styles.subContainer}>
            <View style={styles.container}>
                <Text style={[styles.text, {color: darkTheme ? constants.color_3 : constants.color_1}]}>
                    Type
                </Text>
                <Text style={styles.textType}>
                    { location.type }
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={[styles.text, {color: darkTheme ? constants.color_3 : constants.color_1}]}>
                    Dimension
                </Text>
                <Text style={styles.textDimension}>
                    { location.dimension }
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
    backgroundColor: 'transparent',
    borderWidth: 1, 
    maxWidth: 450,
    marginVertical: 16,
    padding: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 12,
      paddingBottom: 12
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: 6
  },
  line:{
      height: 5,
      width: '75%',
      backgroundColor: constants.color_green,
      borderRadius: 4,
      marginTop: 4,
      marginBottom: 12,
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
  },
  textType: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    letterSpacing: 2,
    color: constants.color_poopybutthole,
    borderColor: constants.color_poopybutthole,
    width: 'max-content',
    maxWidth: '100%',
    paddingHorizontal: 4,
    marginVertical: 8
  },
  textDimension: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    letterSpacing: 2,
    color: constants.color_disease,
    borderColor: constants.color_disease,
    width: 'max-content',
    maxWidth: '100%',
    paddingHorizontal: 4,
    marginVertical: 8
  }
});