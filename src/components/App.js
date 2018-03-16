import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import ajax from '../Ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {
    state = {
        deals: [],
        dealsFormSearch: [],
        currentDealId: null,
    }
    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        this.setState({ deals });
    }
    searchDeals = async (searchTerm) => {
        let dealsFormSearch = [];
        if (searchTerm) {
            dealsFormSearch = await ajax.fetchDealSearchTerm(searchTerm);
        }
        this.setState({ dealsFormSearch });
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
                    <SearchBar searchDeals={this.searchDeals} />
                    <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}  />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text style={styles.header}>espera ai</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize:40,
    }
});

export default App;