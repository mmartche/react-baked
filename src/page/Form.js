import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../Ajax';
import { TextField } from 'react-native-material-textfield';

class Form extends React.Component {
    async componentDidMount() {
        // console.warn(this.props.navigation.state);
    };
    static propTypes = {
        
    };
    state = {
        localTerm: this.props.initialLocalTerm,
        phone: '',
    };
    handleChange = (localTerm) => {
        this.setState({ localTerm }, () => {
                //
            // this.debounceSearchDeals(this.state.localTerm);
        });
    };
    handleClick = async () => {
        try {
            await AsyncStorage.setItem('@MySuperStore:valor', this.state.localTerm);
            console.warn('salvei');
        } catch (error) {
            console.warn(error);
            // Error saving data
        }
    }
    render() {
      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    label='new data'
                    value={this.state.localTerm}
                    onChangeText={this.handleChange} 
                    onSubmitEditing={this.handleClick}
                    />
                <Button onPress={this.handleClick} title="Add to local storage" />
            </View>
        );
    }
}

export default Form;