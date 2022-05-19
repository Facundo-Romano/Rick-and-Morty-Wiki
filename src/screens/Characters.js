import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from 'react-native';
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://rickandmortyapi.com/api/character");
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
        <View style={[styles.container, {width: window.width, backgroundColor: darkTheme ? constants.color_0 : constants.color_4}]}>
            {
                loading ? 
                <Loader/> :
                <View style={[styles.container, {width: window.width}]}>
                    <CustomHeader/>
                    <Pagination page={currentPage} changePage={(page) => changePage(page)} pages={pages}/>
                    <View style={[styles.card, {width: window.width}]}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>  <Card character={item}/>}
                        />
                    </View>
                </View> 
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
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