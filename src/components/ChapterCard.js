import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';
import requireImages from '../css/requireImages';

export default function ChapterCard({ chapter, id, page }) {
  const darkTheme = useTheme();
  const window = useWindowDimensions();

  return (
    <View style={[
        styles.bigContainer, 
        { width: window.width - window.width/7,
          minhHeight: window.height/5, 
          backgroundColor: darkTheme ? constants.color_1 : constants.color_5}]}>
      <Image 
        style={{width: window.height/6, minHeight: window.height/6, height: '100%'}} 
        source={requireImages[id+20*(page-1)]}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={[styles.title, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
            { chapter.name }
        </Text>
        <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
            {`Season ${chapter.episode[2]}`}
        </Text>
        <Text style={[styles.text, {color: darkTheme ? constants.color_4 : constants.color_0}]}>
            {`Episode ${
                chapter.episode[4] > 0 ? chapter.episode[4] + chapter.episode[5] : chapter.episode[5]
            }`}
        </Text>
      </View>
    </View>
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
    width: '50%',
    marginLeft: '6%',
    marginRight: '2%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    marginVertical: 8
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    width: '100%',
    marginBottom: 4
  }
});