import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Button,
  Easing
} from 'react-native';
import ajax from '../Ajax';
// import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator, TabBarBottom  } from 'react-navigation';

class HomeScreen extends React.Component {
    titleXPos = new Animated.Value(0);
    state = {
        deals: [],
        dealsFormSearch: [],
        currentDealId: null,
        activeSearchTerm: '',
    }
    animateTitle = (direction = 1) => {
        const width = Dimensions.get('window').width - 150;
        Animated.timing(
            this.titleXPos,
            {   
                toValue: direction * (width / 2), 
                duration: 10000, 
                easing: Easing.ease, 
            }).start(({ finished }) => {
                if (finished) {
                    this.animateTitle(-1 * direction);
                }
        });
    }
    async componentDidMount() {
        this.animateTitle();
    }
    render() {
        return (
            <View>
                <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
                    <Text style={styles.welcome}>espera ai</Text>
                </Animated.View>
                <Text>IJIJIJIJIJIJ</Text>
                <Button
                    title="Go to details with props"
                    onPress={() => {this.props.navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button
                    title="Go to bar"
                    onPress={() => this.props.navigation.navigate('Details')}
                    />
            </View>
        );
    }
}
class DetailsScreen extends React.Component {
    async componentDidMount() {
        console.warn(this.props);
    }
    render() {
      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize:40,
    }
});


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
        animationEnabled: false,
        swipeEnabled: false,
    }
);