import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../constants';
import CustomModal from './CustomModal';
import { useTheme } from '../context/ThemeContext';

export default function Pagination({ page, changePage, pages }) {
    const window = useWindowDimensions();
    const darkTheme = useTheme();

    return (
        <View style={[ styles.container, 
                    {height: window.height/12, 
                    width: window.width, 
                    backgroundColor: darkTheme ? constants.color_0 : constants.color_4
                    }]}>
                        {
                            page > 1 ?
                            <TouchableOpacity 
                                style={[styles.button, 
                                        {backgroundColor: darkTheme ? constants.color_4 : constants.color_0}
                                        ]} 
                                onPress={() => changePage(page-1)}>
                                <Text style={[styles.text, 
                                            {color: darkTheme ? constants.color_0 : constants.color_4}
                                            ]}>
                                        Prev Page
                                </Text>
                            </TouchableOpacity> :
                            <></>
                        }
                        <TouchableOpacity  
                            style={[styles.button, 
                                    {backgroundColor: darkTheme ? constants.color_4 : constants.color_0}
                                    ]}  
                            onPress={() => changePage(page+1)}>
                            <Text style={[styles.text, 
                                        {color: darkTheme ? constants.color_0 : constants.color_4
                                        }]}>
                                    Next Page
                            </Text>
                        </TouchableOpacity>
                        <View style={[styles.smallContainer, 
                                    {backgroundColor: darkTheme ? constants.color_4 : constants.color_0
                                    }]}>
                            <CustomModal page={page} changePage={(number) => changePage(number)} pages={pages}/>
                        </View>
                    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 12
    },
    button: {
        margin: 6,
        paddingVertical: 6,
        paddingHorizontal: 9,
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        textTransform: 'uppercase',
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 9,
        marginLeft: 18,
        marginRight: '5%',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: 80
    }
});