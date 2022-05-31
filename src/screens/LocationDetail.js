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
            const residentsIds = [];
            const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
            const data =  await response.json();
            for(let i=0; i < data.residents.length; i++) {
                const residentId = data.residents[i].match(regex);
                residentsIds.push(residentId);
            };
            let [res] = await Promise.all([
                fetch(`https://rickandmortyapi.com/api/character/${residentsIds}`),
                setLocation(data)
            ]);
            res = await res.json();
            await setResidents(res);
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
                            <Text style={[styles.title, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                {location.name}
                            </Text>
                            <View style={styles.descriptionContainer}>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                    Type
                                </Text>
                                <View style={{width: '100%', alignItems: 'center', marginBottom: 8}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        {location.type}
                                    </Text>
                                </View>
                                <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                    Dimension
                                </Text>
                                <View style={{width: '100%', alignItems: 'center', marginBottom: 8}}>
                                    <Text style={[styles.text, {color: darkTheme? constants.color_1 : constants.color_3}]}>
                                        {location.dimension}
                                    </Text>
                                </View>
                                <Text style={[styles.text, 
                                    {color: darkTheme? constants.color_1 : constants.color_3, marginRight: 6}]}>
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
                                                        <Text style={[styles.residents, {color: darkTheme? constants.color_1 : constants.color_3}]}>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 8
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