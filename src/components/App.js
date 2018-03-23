import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import ajax from '../Ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';
import Header from './Header';

class App extends React.Component {
    titleXPos = new Animated.Value(0);
    state = {
        deals: [],
        dealsFormSearch: [],
        currentDealId: null,
        activeSearchTerm: '',
    }
    animateTitle = (direction = 1) => {
        const width = Dimensions.get('window').width - 150;
        Animated.timing(
            this.titleXPos,
            {   toValue: direction * (width / 2), 
                duration: 1000, 
                easing: Easing.ease, 
            }).start(({ finished }) => {
                if (finished) {
                    this.animateTitle(-1 * direction);
                }
        });
    }
    async componentDidMount() {
        this.animateTitle();
        const deals = await ajax.fetchInitialDeals();
        this.setState({ deals });
    }
    searchDeals = async (searchTerm) => {
        let dealsFormSearch = [];
        if (searchTerm) {
            dealsFormSearch = await ajax.fetchDealSearchTerm(searchTerm);
        }
        this.setState({ 
            dealsFormSearch,
            activeSearchTerm: searchTerm,
         });
    };
    setCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: dealId,
        });
    };
    unsetCurrentDeal = () => {
        this.setState({
            currentDealId: null,
        });
    };
    currentDeal = () => {
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        );
    };
    render() {
        if (this.state.currentDealId) {
            return (
                <View>
                    <Header actualPage={'DealDetail'} />
                    <DealDetail initialDealData={this.currentDeal()} onBack={this.unsetCurrentDeal} />
                </View>
            );
        }
        const dealsToDisplay = 
            this.state.dealsFormSearch.length > 0 
                ? this.state.dealsFormSearch
                : this.state.deals;
        if (dealsToDisplay.length > 0) {
            return (
                <View>
                    <Header actualPage={'Homel'} />
                    <SearchBar searchDeals={this.searchDeals} initialSearchTerm={this.state.activeSearchTerm} />
                    <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}  />
                </View>
            );
        }
        return (
            <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
                <Text style={styles.welcome}>espera ai</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize:40,
    }
});

export default App;