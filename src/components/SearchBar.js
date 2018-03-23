import React from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { TextField } from 'react-native-material-textfield';

class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired,
    };
    state = {
        searchTerm: this.props.initialSearchTerm,
        phone: '',
    };
    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        // this.inputElement.blur();
    }
    debounceSearchDeals = debounce(this.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debounceSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return (
        <View>
            {/* <TextInput 
                ref={(inputElement) => { this.inputElement = inputElement; }}
                value={this.state.searchTerm}
                placeholder='Search all' 
                style={styles.input} 
                onChangeText={this.handleChange} 
            /> */}
            <TextField
                label='searchterm new'
                value={this.state.searchTerm}
                onChangeText={this.handleChange} 
                />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
    }
})

export default SearchBar;