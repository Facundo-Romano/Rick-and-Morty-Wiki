import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useWindowDimensions } from 'react-native';
import constants from '../css/constants';
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
                                        {backgroundColor: darkTheme ? constants.color_4 : constants.color_2
                                        }
                                        ]} 
                                onPress={() => changePage(page-1)}>
                                <Text style={[styles.text, 
                                        {color: darkTheme ? constants.color_0 : constants.color_5
                                        }]}>
                                        Prev
                                </Text>
                            </TouchableOpacity> :
                            <></>
                        }
                        {
                            page < pages ?
                            <TouchableOpacity  
                                style={[styles.button, 
                                        {backgroundColor: darkTheme ? constants.color_4 : constants.color_2
                                        }
                                        ]}  
                                onPress={() => changePage(page+1)}>
                                <Text style={[styles.text, 
                                            {color: darkTheme ? constants.color_0 : constants.color_5
                                            }]}>
                                        Next
                                </Text>
                            </TouchableOpacity> :
                            <></>
                        }
                        <CustomModal page={page} changePage={(number) => changePage(number)} pages={pages}/>
                    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 12,
    },
    button: {
        margin: 6,
        paddingVertical: 6,
        paddingHorizontal: 9,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        position: 'absolute',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '700',
    }
});