import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired,
    };
    state = {
        searchTerm: this.props.initialSearchTerm,
    };
    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        this.inputElement.blur();
    }
    debounceSearchDeals = debounce(this.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debounceSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return <TextInput 
            ref={(inputElement) => { this.inputElement = inputElement; }}
            value={this.state.searchTerm}
            placeholder='Search all' 
            style={styles.input} 
            onChangeText={this.handleChange} 
        />
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
    }
})

export default SearchBar;