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
    };
    state = {
        searchTerm: '',
    };
    debounceSearchDeals = debounce(this.props.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debounceSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return <TextInput 
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