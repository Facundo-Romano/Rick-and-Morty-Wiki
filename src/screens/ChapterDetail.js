import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';

export default function ChapterDetail({route, navigation}) {
    return (
        <View>
            <Text>ChapterDetail</Text>
            <Text>Id: {route.params.id}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
};