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

class Home extends React.Component {
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
                <Text style={styles.msg}>IJIJIJIJIJIJ</Text>
                <Button
                    title="Go to details with props"
                    onPress={() => {this.props.navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'you want here',
                        });
                    }}
                />
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height:150,
    },
    welcome: {
        fontSize:40,
    },
    msg: {
        height:100,
    }
});

export default Home;