import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Characters from '../screens/Characters';
import Locations from '../screens/Locations';
import Chapters from '../screens/Chapters';
import constants from '../css/constants';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const darkTheme = useTheme();

    return (
         <Tab.Navigator 
            screenOptions = {{ 
              tabBarShowLabel: false, 
              tabBarStyle: {
                  backgroundColor: darkTheme ? constants.color_1 : constants.color_3,
                  borderTopWidth:1,
                  borderTopColor: darkTheme ? constants.color_1 : constants.color_3
                }, 
              headerShown: false }}>
            <Tab.Screen 
                name="Characters" 
                children={(props) => <Characters {...props}/>} 
                options={{ 
                  tabBarIcon: ({focused}) => (
                    <View style={styles.icon}>
                      <Image 
                        style={{
                          height: 35, 
                          width: 35, 
                          tintColor: darkTheme ? 
                                    focused ? constants.color_green : constants.color_3 :
                                    focused ? constants.color_green : constants.color_1
                        }}
                        source={require('../../assets/custom/rickIcon.png')}
                        resizeMode='contain'
                        />
                    </View>
                  )}}
            />
            <Tab.Screen 
                name="Locations" 
                children={(props) => <Locations {...props} />} 
                options={{ tabBarIcon: ({focused}) => 
                          <Ionicons 
                            name="location-sharp" 
                            size={30}  
                            style={{
                              color: darkTheme ? 
                              focused ? constants.color_green : constants.color_3 :
                              focused ? constants.color_green : constants.color_1
                            }}/> 
                        }}
            />
            <Tab.Screen 
                name="Chapters" 
                children={(props) => <Chapters {...props} />} 
                options={{ tabBarIcon: ({focused}) => 
                          <MaterialIcons 
                            name="local-movies" 
                            size={30}
                            style={{
                              color: darkTheme ? 
                              focused ? constants.color_green : constants.color_3 :
                              focused ? constants.color_green : constants.color_1
                            }}/> 
                        }}
            />
         </Tab.Navigator>
      )
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});