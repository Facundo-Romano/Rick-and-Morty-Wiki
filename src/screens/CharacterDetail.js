import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import Loader from '../components/Loader';
import CustomHeader from '../components/CustomHeader';
import { useTheme } from "../context/ThemeContext";
import constants from "../css/constants";

export default function CharacterDetail({route, navigation}) {
    const id = route.params.id;
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState({});
    const window = useWindowDimensions();
    const darkTheme = useTheme();
    const regex = /(\d+)/g;
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data =  await response.json();
            await Promise.all([
                setCharacter(data),
                setLoading(false)
            ])
        };
        
        fetchData()
        .catch(err => console.log(err))
    }, [isFocused]);

    return (
        <ScrollView 
            style={{backgroundColor: darkTheme? constants.color_1 : constants.color_3}}
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <CustomHeader/>
            </View>
            <View style={styles.main}>
                    {
                        loading ? 
                        <View style={[styles.loaderContainer, {height: window.height, width: window.width, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
                            <Loader/>
                        </View>
                        :
                        <View 
                            style={[styles.container, 
                                    {
                                        width: window.width-50,
                                        backgroundColor: darkTheme? constants.color_3 : constants.color_1
                                    }
                                ]}>
                            <Image 
                                style={[styles.img, {width: window.width*3/4, height: window.width*3/4}]} 
                                source={{uri: character.image}}  
                                resizeMode="cover" />
                            <Text style={[styles.title, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                {character.name}
                            </Text>
                            <View style={styles.descriptionContainer}>
                                <Text style={[
                                    styles.textContainer, {
                                        color: constants['color_' + character.status.toLowerCase()],
                                        borderColor: constants['color_' + character.status.toLowerCase()]
                                    }]}>
                                    {`Status  ${character.status}`}
                                </Text>
                                <Text style={[
                                    styles.textContainer, {
                                        color: constants['color_' + character.species.toLowerCase().replace(/\s/g, "")],
                                        borderColor: constants['color_' + character.species.toLowerCase().replace(/\s/g, "")]
                                    }]}>
                                    {`Species  ${character.species}`}
                                </Text>
                                <Text style={[
                                    styles.textContainer, {
                                        color: constants['color_' + character.gender.toLowerCase()],
                                        borderColor: constants['color_' + character.gender.toLowerCase()]
                                    }]}>
                                    {`Gender  ${character.gender}`}
                                </Text>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        Origin:
                                </Text>
                                <TouchableOpacity onPress={character.origin.url ? () => navigation.navigate('LocationDetail', {id: character.origin.url.match(regex)}) : () => {return}}>
                                    <Text style={[
                                        styles.textContainer, {
                                            color: character.origin.name.toLowerCase() === 'unknown' ? constants.color_unknown : constants.color_disease,
                                            borderColor: character.origin.name.toLowerCase() === 'unknown' ? constants.color_unknown : constants.color_disease
                                        }]}>
                                        {character.origin.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        Last known location:
                                </Text>
                                <TouchableOpacity onPress={character.location.url ? () => navigation.navigate('LocationDetail', {id: character.location.url.match(regex)}) : () => {return}}>
                                    <Text style={[
                                        styles.textContainer, {
                                            color: constants.color_disease,
                                            borderColor: constants.color_disease
                                        }]}>
                                        {character.location.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={[styles.text, 
                                        {color: darkTheme? constants.color_1 : constants.color_3, marginRight: 6}]}>
                                            Episodes:
                                </Text>
                                <View style={styles.episodesContainer}>
                                    {
                                        character.episode.map((item, idx) => {
                                            const episode = item.match(regex)
                                            return (
                                                <TouchableOpacity
                                                    style={{marginHorizontal: 2, marginVertical: 3}}
                                                    onPress={() => navigation.navigate('ChapterDetail', {id: episode})} 
                                                    key={idx}
                                                    >
                                                    <Text style={styles.episodes}>
                                                        {episode}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View> 
                    } 
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      margin: 16,
      padding: 12
    },
    img: {
        borderRadius: 25
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        marginTop: 12
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        padding: 12,
        borderRadius: 16,
        width: '100%'
    },
    textContainer: {
      alignSelf: "flex-start",
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
      borderWidth: 1,
      maxWidth: '100%',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
      letterSpacing: 2,
      paddingHorizontal: 4,
      marginBottom: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        margin: 3
    },
    episodesContainer: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap:'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        maxWidth: '100%',
        backgroundColor: 'transparent',
        borderColor: constants.color_unknown
    },
    episodes: {
        alignSelf: "flex-start",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: constants.color_unknown,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});