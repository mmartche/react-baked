import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
  Image,
  Dimensions,
  Button,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util';
import ajax from "../Ajax";

class DealDetail extends React.Component {
    imageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs.dx);
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            }
        },
    });
    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection,
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        });
    }
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  state = {
      deal: this.props.initialDealData,
      imageIndex: 0,
  };
  async componentDidMount() {
      const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
      this.setState({
          deal: fullDeal,
      });
  };
  openDealUrl = () => {
    Linking.openURL(this.state.deal.url);
  };
  render() {
      const { deal } = this.state;
    return (
        <View style={styles.deal}>
            <TouchableOpacity onPress={this.props.onBack} >
                <Text style={styles.backLink}>Backu</Text>
            </TouchableOpacity>
            <Animated.Image 
                {...this.imagePanResponder.panHandlers}
                source={{uri: deal.media[this.state.imageIndex]}} 
                style={[{left: this.imageXPos }, styles.image]} />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text>{deal.dealType}</Text>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{deal.price}</Text>
                </View>
            </View>
            {deal.user && (
            <View style={styles.info}>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
                <Text>{deal.description}</Text>
                <Text>.........................</Text>
            </View>
            )}
            <Button title="Buy this" onPress={this.openDealUrl} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    deal: {
        
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
        
    },
    info: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
      flexDirection: 'row',
      flex:1,
      height:200,
    },
    avatar: {
        width: 60,
        height: 60,
    }
});

export default DealDetail;