import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Loader from "../components/Loader";
import { useWindowDimensions } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Pagination from "../components/Pagination";
import ChapterCard from '../components/ChapterCard';
import constants from "../css/constants";
import { useTheme } from "../context/ThemeContext";

export default function Chapters({navigation}) {
    const scrollRef = useRef();
    const [reload, setReload] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const window = useWindowDimensions();
    const darkTheme = useTheme();
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = scrolling.interpolate({
        inputRange: searching ? [100, 200] : [60, 160],
        outputRange: [0, -100],
        extrapolate: 'clamp'
    });
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const episodesData = await fetch(`https://rickandmortyapi.com/api/episode?page=1`)
            const episodes = await episodesData.json();
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
            await Promise.all([
                setData(episodes.results),
                setSearching(false),
                setLoading(false),
                setPages(episodes.info.pages),
                setCurrentPage(1),
                setError(false)
            ])
        }
        fetchData()
        .catch(err => console.log(err))
    }, [isFocused, reload]);
    
    const changePage = (page) => {
        try {
            if (page === '') {
                return
            }

            if (typeof parseInt(page) !== 'number') {
                return
            }
            
            setLoading(true);
            searching ?
            fetch(`https://rickandmortyapi.com/api/episode?page=${page}&name=${searchValue}`)
            .then((response) => response.json())
            .then((data) => {
                Promise.all([
                    setData(data.results),
                    setCurrentPage(page),
                    setLoading(false)
                ])
            })
            .catch((err) => console.log(err))
            :
            fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
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
    };

    const searchOne = async(input) => {
        try {
            let [res] = await Promise.all([
                fetch(`https://rickandmortyapi.com/api/episode/?name=${input.toLowerCase()}`),
                setLoading(true),
                setSearching(true),
                setSearchValue(input.toLowerCase()),
                setError(false)
            ]);

            res = await res.json();

            if(res.results === 'undefined') {
                setError('No results')
            };

            await Promise.all([
                setData(res.results),
                setPages(res.info.pages),
                setCurrentPage(1),
                setLoading(false)
            ]);
        } catch (err) {
            Promise.all([
                setData([]),
                setPages(0),
                setSearching(true),
                setError('No results'),
                setLoading(false)
            ])
        }
    };

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
                ref={scrollRef}
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
                        <View style={[styles.loaderContainer, {minHeight: window.height, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
                            <Loader/>
                        </View>
                        :
                        <View style={[styles.container, {width: window.width, marginTop: window.height/12}]}>
                            <Pagination page={currentPage} changePage={(page) => changePage(page)} pages={pages} searchOne={(i) => searchOne(i)}/>
                            {
                                searching ?
                                    <View style={[styles.search, {width: window.width, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
                                        <View style={styles.innerSearchContainer}>
                                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}} onPress={() => setReload(!reload)}>
                                                <Text style={[styles.backBtnText, 
                                                            {borderColor: darkTheme ? constants.color_3 : constants.color_1,
                                                            color: darkTheme ? constants.color_3 : constants.color_1
                                                            }]}>
                                                    Clear 
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.results, {marginLeft: window.width/2-105, color : darkTheme ? constants.color_3 : constants.color_1}]}>
                                                Results
                                            </Text>
                                        </View>
                                    </View> 
                                    : 
                                    <></>
                            }
                            {
                                error ?
                                <View style={[styles.errorContainer, {width: window.width, minHeight: window.height/12*9, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
                                    <Text style={styles.error}>{error}</Text> 
                                </View> 
                                : 
                                <View style={[styles.card, {width: window.width, minHeight: window.height/12*9, backgroundColor: darkTheme ? constants.color_1 : constants.color_3}]}>
                                    {
                                        data.map((item, idx) => {
                                            return (
                                                <ChapterCard chapter={item} key={idx} navigation={navigation} />
                                            )
                                        })
                                    }
                                </View>
                            }
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
        justifyContent: 'flex-start',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 50,
        paddingTop: 12
    },
    innerSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 12
    },
    results: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        width: 100
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        fontSize: 16,
        fontWeight: '500',
        color: constants.color_dead
    },
    backBtnText: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 6,
        width: 40
    }
});