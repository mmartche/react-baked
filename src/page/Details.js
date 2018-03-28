import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import ajax from '../Ajax';

class DetailsScreen extends React.Component {
    async componentDidMount() {
        console.warn(this.props.navigation.state);
    }
    render() {
      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

export default DetailsScreen;