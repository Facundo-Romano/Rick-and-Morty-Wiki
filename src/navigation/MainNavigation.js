import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import CharacterDetail from '../screens/CharacterDetail';
import LocationDetail from '../screens/LocationDetail';
import ChapterDetail from '../screens/ChapterDetail';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                            name='TabNavigation'
                            component ={TabNavigation}
                            options = {{headerShown: false}}
                        />
                    <Stack.Screen 
                            name='CharacterDetail'
                            component ={CharacterDetail}
                            options = {{headerShown: false}}
                        />
                    <Stack.Screen 
                            name='LocationDetail'
                            component ={LocationDetail}
                            options = {{headerShown: false}}
                        />
                    <Stack.Screen 
                            name='ChapterDetail'
                            component ={ChapterDetail}
                            options = {{headerShown: false}}
                        />
                </Stack.Navigator>
        </NavigationContainer>
    )
}