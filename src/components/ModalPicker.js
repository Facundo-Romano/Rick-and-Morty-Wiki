import React from 'react';
import { Text, View, TouchableOpacity, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import constants from '../css/constants';

export default function ModalPicker({modalVisibility, changePage, pages}) {
    const pagesArr = Array(pages).fill().map((_, idx) => 1 + idx);
    const window = useWindowDimensions();
    const darkTheme = useTheme();

    return (
        <TouchableOpacity style={styles.modal} onPress={() => modalVisibility(false)}>
            <View style={[styles.container, 
                        {width: window.width/5, 
                        height: window.height*0.9, 
                        backgroundColor: darkTheme ? constants.color_0 : constants.color_4
                    }]}>
                <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {
                        pagesArr.map((item, index) => {
                            return (
                                <TouchableOpacity style={[styles.option, {marginLeft: window.width/20}]} onPress={() => {
                                    modalVisibility(false)
                                    changePage(item)
                                    }
                                    } key={index}
                                    >
                                    <View style={[styles.circle, 
                                                {backgroundColor: darkTheme ? constants.color_4 : constants.color_0}
                                            ]} />
                                    <Text style={[styles.text, 
                                                {color: darkTheme ? constants.color_4 : constants.color_0}
                                                ]}>
                                                    {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }) 
                    }
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    container: {
        borderRadius: 10
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40
    },
    circle: {
        width: 7,
        height: 7,
        borderRadius: 7,
        marginRight: 4
    },
    text: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'normal'
    }
});