import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import ajax from '../Ajax';

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


export default SettingsScreen;