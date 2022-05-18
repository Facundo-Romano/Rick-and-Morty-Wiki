import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import ModalPicker from './ModalPicker';

export default function CustomModal({ page, changePage, pages }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
       <View style={styles.container}>
           <TouchableOpacity style={styles.button} onPress={() => {setIsModalVisible(true)}}>
                <Text style={styles.text}>Page: </Text>
                <Text style={styles.text}>{page}</Text>
           </TouchableOpacity>
           <Modal
                transparent={true}
                isVisible={isModalVisible}
                onRequestClose={() => {setIsModalVisible(false)}}
                onBackdropPress={() => {setIsModalVisible(false)}}
                onBackButtonPress={() => {setIsModalVisible(false)}}
                swipeDirection="right"
                onSwipeComplete={() => {setIsModalVisible(false)}}
                animationIn={'slideInRight'} 
                animationInTiming={800}
                animationOut={'slideOutRight'} 
                animationOutTiming={800}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                deviceHeight={window.height}
                deviceWidth={window.width}
                children={ 
                    <ModalPicker 
                    modalVisibility={(boolean) => setIsModalVisible(boolean)} 
                    changePage={(number) => changePage(number)}
                    pages={pages}/>}
                />
       </View>  
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000'
    }
});