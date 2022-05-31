import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../components/Loader';
import CustomHeader from '../components/CustomHeader';
import { useTheme } from "../context/ThemeContext";
import constants from "../css/constants";

export default function LocationDetail({route, navigation}) {
    const id = route.params.id;
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({});
    const [residents, setResidents] = useState([]);
    const window = useWindowDimensions();
    const darkTheme = useTheme();
    const regex = /(\d+)/g;
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const residentsPromiseArr = [];
            const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
            const data =  await response.json();
            for(let i=0; i < data.residents.length; i++) {
                const residentId = data.residents[i].match(regex);
                residentsPromiseArr.push(
                    fetch(`https://rickandmortyapi.com/api/character/${residentId}`)
                        .then(res => res.json())
                        .then(res => setResidents(prevState => [...prevState, {name: res.name, id: res.id}]))
                )
            }
            await setResidents([]);
            await Promise.all([
                ...residentsPromiseArr,
                setLocation(data),
                setLoading(false)
            ])
        };
        
        fetchData()
        .catch(err => console.log(err))
    }, [isFocused]);

    return (
        <ScrollView 
            style={{backgroundColor: darkTheme? constants.color_0 : constants.color_5}}
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <CustomHeader/>
            </View>
            <View style={styles.goBackContainer}>
                <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={34} color={darkTheme? constants.color_5 : constants.color_0} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                    {
                        loading ? 
                        <View style={[styles.loaderContainer, {height: window.height, width: window.width, backgroundColor: darkTheme ? constants.color_0 : constants.color_4}]}>
                            <Loader/>
                        </View>
                        :
                        <View 
                            style={[styles.container, 
                                    {
                                        width: window.width-50, 
                                        backgroundColor: darkTheme? constants.color_2 : constants.color_4
                                    }
                                ]}>
                            <Text style={[styles.title, {color: darkTheme? constants.color_5 : constants.color_0}]}>
                                {location.name}
                            </Text>
                            <View style={styles.descriptionContainer}>
                                <Text style={[styles.text, {color: darkTheme? constants.color_5 : constants.color_0}]}>
                                    Type
                                </Text>
                                <View style={{width: '100%', alignItems: 'center', marginBottom: 8}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_5 : constants.color_0}]}>
                                        {location.type}
                                    </Text>
                                </View>
                                <Text style={[styles.text, {color: darkTheme? constants.color_5 : constants.color_0}]}>
                                    Dimension
                                </Text>
                                <View style={{width: '100%', alignItems: 'center', marginBottom: 8}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_5 : constants.color_0}]}>
                                        {location.dimension}
                                    </Text>
                                </View>
                                <Text style={[styles.text, 
                                    {color: darkTheme? constants.color_5 : constants.color_0, marginRight: 6}]}>
                                        Residents:
                                </Text>
                                <View style={styles.residentsContainer}>
                                        {
                                            residents.map((item, idx) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={{marginHorizontal: 2, marginVertical: 3}}
                                                        onPress={() => navigation.navigate('CharacterDetail', {id: item.id})} 
                                                        key={idx}
                                                        >
                                                        <Text style={[styles.residents, {color: darkTheme? constants.color_5 : constants.color_0}]}>
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
        minHeight: 60,
        width: '100%',
    },
    goBackContainer: {
        minHeight: 30,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 18,
        margin: 6
    },
    goBackBtn: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 6
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
    residentsContainer: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap:'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    residents: {
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