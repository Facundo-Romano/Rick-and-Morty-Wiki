import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Characters from '../screens/Characters';
import Locations from '../screens/Locations';
import Chapters from '../screens/Chapters';
import constants from '../constants';

const Tab = createBottomTabNavigator();

class TabNavigation extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <NavigationContainer>
         <Tab.Navigator 
            screenOptions = {{ tabBarShowLabel: false, tabBarStyle: {} }}>
            <Tab.Screen 
                name="Characters" 
                children={() => <Characters />} 
                options={{ 
                  tabBarIcon: ({focused}) => (
                    <View style={styles.icon}>
                      <Image 
                        style={{
                          height: 35, 
                          width: 35, 
                          tintColor: focused ? constants.color_3 : constants.color_4 }}
                        source={require('../../assets/rickIcon.png')}
                        resizeMode='contain'
                        />
                    </View>
                  )}}
            />
            <Tab.Screen 
                name="Locations" 
                children={() => <Locations />} 
                options={{ tabBarIcon: ({focused}) => 
                          <Ionicons 
                            name="location-sharp" 
                            size={30}  
                            style={{color: focused ? constants.color_3 : constants.color_4}}/> 
                        }}
            />
            <Tab.Screen 
                name="Chapters" 
                children={() => <Chapters />} 
                options={{ tabBarIcon: ({focused}) => 
                          <MaterialIcons 
                            name="local-movies" 
                            size={30}
                            style={{color: focused ? constants.color_3 : constants.color_4}} /> 
                        }}
            />
         </Tab.Navigator>
       </NavigationContainer>
      )
  }
}

const styles = StyleSheet.create({
  navigaton: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: constants.color_1,
    borderRadius: 15,
    height: 45
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TabNavigation;