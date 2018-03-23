import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

class Header extends React.Component {
    static propTypes = {
        onBack: PropTypes.func,
        actualPage: PropTypes.string.isRequired,
      };
      state = {
          actualPage: this.props.actualPage,
          onBackButton: this.props.onBack,
      }
    componentDidMount() {
        this.setState({
            actualPage: this.props.actualPage,
        });
    };
    render(){
        const width = Dimensions.get('window').width - 150;
        console.warn(this.props.actualPage);
        const backHistory = 
            this.props.onBack != 'null'
            ? (
                <TouchableOpacity style={styles.backLink} onPress={this.props.onBack} >
                    <Text>Back</Text>
                </TouchableOpacity>
            )
            : '';
        return (
            <View style={styles.container}>
                {backHistory}
                <Text style={styles.header}>Header</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    header: {
        flex: 2,
        fontSize:40,
    },
    backLink: {
        flex: 1,
        backgroundColor: '#eee',
        height: 50,
        borderWidth: 1,
    },
});

export default Header;