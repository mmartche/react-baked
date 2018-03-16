import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util';
import ajax from "../Ajax";

class DealDetail extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  state = {
      deal: this.props.initialDealData
  };
  async componentDidMount() {
      const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
      this.setState({
          deal: fullDeal,
      });
  };
  render() {
    const { deal } = this.state;
    return (
        <View style={styles.deal}>
            <TouchableOpacity onPress={this.props.onBack} >
                <Text style={styles.backLink}>Backu</Text>
            </TouchableOpacity>
            <Image source={{uri: deal.media[0]}} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text>{deal.dealType}</Text>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{deal.price}</Text>
                </View>
            </View>
            {deal.user && (
            <View>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
            </View>
            )}
            <View>
                <Text style={styles.description}>{deal.description}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 12,
        marginTop: 5,
    },
    image: {
        width:'100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    backLink: {
        marginBottom: 5,
        color: 'blue',
    },
    detail: {
        borderWidth: 1,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    description: {
        flex:1,
    },
    avatar: {
        width: 60,
        height: 60,
    }
});

export default DealDetail;