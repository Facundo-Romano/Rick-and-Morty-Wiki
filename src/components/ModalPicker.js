import React from 'react';
import { Text, View, TouchableOpacity, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';

export default function ModalPicker({modalVisibility, changePage, pages}) {
    const pagesArr = Array(pages).fill().map((_, idx) => 1 + idx);
    const window = useWindowDimensions();

    return (
        <TouchableOpacity style={styles.modal} onPress={() => modalVisibility(false)}>
            <View style={[styles.container, { width: window.width/4, height: window.height*0.9}]}>
                <ScrollView>
                    {
                        pagesArr.map((item, index) => {
                            return ( 
                                <TouchableOpacity style={styles.option} onPress={() => {
                                    modalVisibility(false)
                                    changePage(item, 0)
                                    }
                                    } key={index}
                                    >
                                    <Text style={styles.text}>{item}</Text>
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
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'normal'
    }
});