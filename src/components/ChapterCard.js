import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';
import requireImages from '../css/requireImages';

export default function ChapterCard({ chapter, id, page, navigation }) {
  const darkTheme = useTheme();
  const window = useWindowDimensions();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ChapterDetail', {id: chapter.id})}
      style={[
        styles.bigContainer, 
        { width: window.width - window.width/7,
          minhHeight: window.height/5, 
          borderColor: darkTheme ? constants.color_3 : constants.color_1}]}>
      <Image 
        style={{width: window.height/6, minHeight: window.height/6, height: '100%'}} 
        source={requireImages[id+20*(page-1)]}  
        resizeMode="cover"/>
      <View style={ styles.container }>
        <Text style={[styles.title, {color: darkTheme ? constants.color_3 : constants.color_1}]}>
            { chapter.name }
        </Text>
        <Text style={styles.textSeason}>
            {`Season ${chapter.episode[2]}`}
        </Text>
        <Text style={styles.textEpisode}>
            {`Episode ${chapter.episode[4] > 0 ? chapter.episode[4] + chapter.episode[5] : chapter.episode[5]}`}
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
    width: '50%',
    marginBottom: '3%',
    marginLeft: '6%',
    marginRight: '2%',
    justifyContent: 'flex-start',
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
  },
  textSeason: {
    alignSelf: "flex-start",
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    letterSpacing: 2,
    color: constants.color_animal,
    borderColor: constants.color_animal,
    maxWidth: '100%',
    paddingHorizontal: 4,
    marginVertical: 8
  },
  textEpisode: {
    alignSelf: "flex-start",
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    borderWidth: 1,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    letterSpacing: 2,
    color: constants.color_cronenberg,
    borderColor: constants.color_cronenberg,
    maxWidth: '100%',
    paddingHorizontal: 4,
    marginTop: 4,
    marginBottom: 8
  }
});