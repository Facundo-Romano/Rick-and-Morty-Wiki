import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import constants from '../css/constants';
import CustomModal from './CustomModal';
import { useTheme } from '../context/ThemeContext';

export default function Pagination({ page, changePage, pages, searchOne }) {
    const [text, setText] = useState('')
    const window = useWindowDimensions();
    const darkTheme = useTheme();

    return (
        <View style={[ styles.container, 
                    {height: window.height/12, 
                    width: window.width, 
                    backgroundColor: darkTheme ? constants.color_1 : constants.color_3
                    }]}>
                        <TextInput 
                            style={[styles.input, 
                                    {
                                        width: window.width/3, 
                                        color: darkTheme ? constants.color_3 : constants.color_1,
                                        borderColor: darkTheme ? constants.color_3 : constants.color_1
                                    }]}
                            value = {text}
                            onChangeText={(text) => setText(text)}
                            placeholder = 'Search...'
                            placeholderTextColor = {darkTheme ? constants.color_3 : constants.color_1}
                            keyboardType = 'default'
                            returnKeyType="search"
                            onSubmitEditing={() => searchOne(text)}
                        />
                        {
                            page > 1 ?
                            <TouchableOpacity 
                                style={[styles.button, 
                                        {backgroundColor: darkTheme ? constants.color_3 : constants.color_1
                                        }
                                        ]} 
                                onPress={() => changePage(page-1)}>
                                    <MaterialIcons name="keyboard-arrow-left" size={24} color={darkTheme ? constants.color_1 : constants.color_3} />
                            </TouchableOpacity> :
                            <></>
                        }
                        {
                            page < pages ?
                            <TouchableOpacity  
                                style={[styles.button, 
                                        {backgroundColor: darkTheme ? constants.color_3 : constants.color_1
                                        }
                                        ]}  
                                onPress={() => changePage(page+1)}>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color={darkTheme ? constants.color_1 : constants.color_3} />
                            </TouchableOpacity> :
                            <></>
                        }
                        {
                            pages > 0 ? 
                                <CustomModal page={page} changePage={(number) => changePage(number)} pages={pages}/>
                                :
                                <></>
                        }          
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
    },
    input: {
        height: 30,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 12
    },
    button: {
        margin: 6,
        borderRadius: 5,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});