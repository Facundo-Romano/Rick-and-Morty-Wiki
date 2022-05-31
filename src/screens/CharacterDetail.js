import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                    Status:  {character.status}
                                </Text>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                    Species:  {character.species}
                                </Text>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                    Gender:  {character.gender}
                                </Text>
                                <TouchableOpacity onPress={character.origin.url ? () => navigation.navigate('LocationDetail', {id: character.origin.url.match(regex)}) : () => {return}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        Origin:  {character.origin.name}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={character.location.url ? () => navigation.navigate('LocationDetail', {id: character.location.url.match(regex)}) : () => {return}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        Last known location:
                                    </Text>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        {character.location.name}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.episodesContainer}>
                                    <Text style={[styles.text, 
                                        {color: darkTheme? constants.color_1 : constants.color_3, marginRight: 6}]}>
                                            Episodes:
                                    </Text>
                                    {
                                        character.episode.map((item, idx) => {
                                            const episode = item.match(regex)
                                            return (
                                                <TouchableOpacity
                                                    style={{marginHorizontal: 2, marginVertical: 3}}
                                                    onPress={() => navigation.navigate('ChapterDetail', {id: episode})} 
                                                    key={idx}
                                                    >
                                                    <Text style={[styles.episodes, {color: darkTheme? constants.color_1 : constants.color_3}]}>
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
        justifyContent: 'center'
    },
    episodes: {
        fontSize: 16,
        fontWeight: '500',
        margin: 1
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