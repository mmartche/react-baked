import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import ajax from '../Ajax';

class DetailsScreen extends React.Component {
    async componentDidMount() {
        // console.warn(this.props.navigation.state);
        try {
            const valueTerm = await AsyncStorage.getItem('@MySuperStore:valor');
            if (valueTerm !== null){
              // We have data!!
                this.setState({
                    valueTerm
                });
            }
          } catch (error) {
            // Error retrieving data
          }
    };
    render() {
      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
                <Text>{ 'valueState.valueTerm' }</Text>
                <Text>....</Text>
            </View>
        );
    }
}

export default DetailsScreen;