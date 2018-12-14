import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);

        this.state = {
            acomodacoes: [],
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('http://acomodacao-tcc.herokuapp.com/api/v1/acomodacoes')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    acomodacoes: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this._onItemPress(item)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <Text style={{ marginLeft: 10 }}>{item.titulo}</Text>
                <Text style={{ marginLeft: 10 }}>{item.preco}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Description', { acomodacao: item })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                {/* <FlatList
          data={this.state.acomodacoes}
          renderItem={({item}) => <Text>{item.titulo}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}
                <FlatList
                    data={this.state.acomodacoes}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 1, backgroundColor: '#f7f7f7' }}
                        />}
                />
            </View>
        );
    }
}
