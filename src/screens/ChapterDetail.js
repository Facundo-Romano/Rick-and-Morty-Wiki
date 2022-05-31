import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import Loader from '../components/Loader';
import CustomHeader from '../components/CustomHeader';
import { useTheme } from "../context/ThemeContext";
import constants from "../css/constants";
import requireImages from '../css/requireImages';

export default function ChapterDetail({route, navigation}) {
    const id = route.params.id;
    const [loading, setLoading] = useState(true);
    const [chapter, setChapter] = useState({});
    const [characters, setCharacters] = useState([]); 
    const window = useWindowDimensions();
    const darkTheme = useTheme();
    const regex = /(\d+)/g;
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const charactersIds = [];
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const data =  await response.json();
            for(let i=0; i < data.characters.length; i++) {
                const characterId = data.characters[i].match(regex);
                charactersIds.push(characterId);
            };
            let [res] = await Promise.all([
                fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`),
                setChapter(data)
            ]);
            res = await res.json();
            await setCharacters(res);
            await setLoading(false);
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
                        <View style={[styles.loaderContainer, {minHeight: window.height, width: window.width, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
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
                                style={[styles.img, {width: window.width*3/4, height: window.width*2/4}]} 
                                source={requireImages[id]}   
                                resizeMode="cover" />
                            <Text style={[styles.title, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                {chapter.name}
                            </Text>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.textSeason}>
                                    {`Season:  ${chapter.episode[2]}`}
                                </Text>
                                <Text style={styles.textEpisode}>
                                    {`Episode:  ${
                                        chapter.episode[4] > 0 ? chapter.episode[4] + chapter.episode[5] : chapter.episode[5]
                                    }`}
                                </Text>
                                <Text style={styles.text}>
                                    Air date
                                </Text>
                                <Text style={styles.textDate}>
                                   {chapter.air_date}
                                </Text>
                                <Text style={[styles.text, 
                                        {color: darkTheme? constants.color_1 : constants.color_3, marginRight: 6}]}>
                                           Characters
                                </Text>
                                <View style={styles.charactersContainer}>
                                    {
                                        characters.map((item, idx) => {
                                            return (
                                                <TouchableOpacity
                                                    style={{marginHorizontal: 2, marginVertical: 3}}
                                                    onPress={() => navigation.navigate('CharacterDetail', {id: item.id})} 
                                                    key={idx}
                                                    >
                                                    <Text style={styles.characters}>
                                                        {item.name}
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
        marginTop: 12,
        textAlign: 'center'
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        padding: 12,
        borderRadius: 16,
        width: '100%'
    },
    textSeason: {
        alignSelf: "flex-start",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
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
        fontSize: 18,
        fontWeight: '700',
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
    },
    textDate: {
        alignSelf: "flex-start",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        borderWidth: 1,
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        letterSpacing: 2,
        color: constants.color_human,
        borderColor: constants.color_human,
        maxWidth: '100%',
        paddingHorizontal: 4,
        marginVertical: 8
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        margin: 3,
    },
    charactersContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: constants.color_unknown,
        padding: 8,
        marginTop: 8
    },
    characters: {
        textAlign: 'center',
        fontSize: 12,
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