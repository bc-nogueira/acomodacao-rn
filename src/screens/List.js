import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default class List extends Component {
    static navigationOptions = {
        title: 'Acomodações',
    };

    constructor(props) {
        super(props);

        this.state = {
            acomodacoes: [],
            isLoading: true,
            inicioTimer: this.props.navigation.state.params.inicioTimer,
        }
    }

    componentDidMount() {
        axios.get('http://acomodacao-tcc.herokuapp.com/api/v1/acomodacoes')
            .then(response => {
                this.setState({
                    isLoading: false,
                    acomodacoes: response.data
                });
                ToastAndroid.show((moment().valueOf() - this.state.inicioTimer).toString() + 'ms', 
                    ToastAndroid.SHORT);
            })
            .catch(error => console.log("Erro: " + error))
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                    {item.titulo}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacidade: </Text>
                        <Text>{item.capacidade}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Preço: </Text>
                        <Text>{item.preco}</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 5, marginTop: 5 }}>
                    <Button title="Visualizar" onPress={() => this._onItemPress(item)} />
                </View>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Description', { 
            acomodacao: item,
            inicioTimerDescription: moment().valueOf()
        })
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
            <View style={{ flex: 1, paddingTop: 5 }}>
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
