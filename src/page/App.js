import React from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import ajax from '../Ajax';
// import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator, TabBarBottom  } from 'react-navigation';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import SettingsScreen from './Settings';
import FormScreen from './Form';

const HomeStack = StackNavigator({
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
});

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
});

export default TabNavigator({
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
    Form: { screen: FormScreen },
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Settings') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
        // return ( <Text> {iconName}</Text> );
        },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
        animationEnabled: true,
        swipeEnabled: true,
    }
);