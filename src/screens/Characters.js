import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, ScrollView, Animated, Text } from 'react-native';
import Loader from "../components/Loader";
import { useWindowDimensions } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Pagination from "../components/Pagination";
import Card from '../components/Card';
import constants from "../css/constants";
import { useTheme } from "../context/ThemeContext";

export default function Characters() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const window = useWindowDimensions();
    const darkTheme = useTheme();
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = scrolling.interpolate({
        inputRange: [10, 120],
        outputRange: [0, -100],
        extrapolate: 'clamp'
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
            const data =  await response.json();
            await Promise.all([
                setData(data.results),
                setLoading(false),
                setPages(data.info.pages),
                setTotalCharacters(data.info.count)
            ])
        }
        
        fetchData()
        .catch(err => console.log(err))
    }, [])
    
    const changePage = (page) => {
        try {
            if (page === '') {
                return
            }

            if (typeof parseInt(page) !== 'number') {
                return
            }
            
            setLoading(true)
            fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                Promise.all([
                    setData(data.results),
                    setCurrentPage(page),
                    setLoading(false)
                ])
            })
            .catch((err) => console.log(err))
        } catch (err) {
            console.log(err)
            return
        }
    }

    return (
        <>
            <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: window.height/12,
                    width: window.width,
                    zIndex: 1,
                    transform: [{
                        translateY: translation
                    }] 
                }}>
                <CustomHeader/>
            </Animated.View>
            <Animated.ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: scrolling
                            }
                        }
                    }
                    ], { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={{flex: 1}}>
                    {
                        loading ? 
                        <View style={[styles.loaderContainer, {height: window.height, backgroundColor: darkTheme ? constants.color_0 : constants.color_4}]}>
                            <Loader/>
                        </View>
                        :
                        <View style={[styles.container, {width: window.width, marginTop: window.height/12}]}>
                            <Pagination page={currentPage} changePage={(page) => changePage(page)} pages={pages}/>
                                <View style={[styles.card, {width: window.width, backgroundColor: darkTheme ? constants.color_0 : constants.color_4}]}>
                                    {
                                        data.map((item, idx) => {
                                            return (
                                                <Card character={item} key={idx} />
                                            )
                                        })
                                    }
                                </View>
                        </View> 
                    } 
            </Animated.ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
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