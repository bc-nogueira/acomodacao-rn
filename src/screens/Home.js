import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Acomodações',
    };

    constructor(props) {
        super(props);

        this.state = {
            acomodacoes: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get('http://acomodacao-tcc.herokuapp.com/api/v1/acomodacoes')
            .then(response => {
                this.setState({
                    isLoading: false,
                    acomodacoes: response.data
                });
            })
            .catch(error => console.log("Erro: " + error))
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
                <FlatList
                    data={this.state.acomodacoes}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 1, backgroundColor: '#f7f7f7' }}
                        />}
                />
            </View>
        );
    }
}
