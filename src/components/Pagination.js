import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import CustomModal from './CustomModal';

export default function Pagination({ page, changePage, pages }) {
    const window = useWindowDimensions();
    return (
        <View style={[styles.container, {height: window.height/12, width: window.width}]}>
                        {
                            page > 1 ?
                            <TouchableOpacity style={styles.button} onPress={() => changePage(page, -1)}>
                                <Text style={styles.text}>Prev Page</Text>
                            </TouchableOpacity> :
                            <></>
                        }
                        <TouchableOpacity  style={styles.button} onPress={() => changePage(page, 1)}>
                            <Text style={styles.text}>Next Page</Text>
                        </TouchableOpacity>
                        <View style={styles.smallContainer}>
                            <CustomModal page={page} changePage={(number, diff) => changePage(number, diff)} pages={pages}/>
                        </View>
                    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 6,
        paddingVertical: 6,
        paddingHorizontal: 9,
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40,
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
        marginRight: 55,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40,
        width: 80
    }
});