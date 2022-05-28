import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';

export default function CharacterDetail({route, navigation}) {
    return (
        <View>
            <Text>CharacterDetail</Text>
            <Text>Id: {route.params.id}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
};