import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import FullWidthImage from './../components/FullWidthImage';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class Description extends Component {
    static navigationOptions = {
        title: 'Detalhes'
    }

    constructor(props) {
        super(props);

        this.state = {
            acomodacao: null, 
            urls: []
        }
    }
    
    componentDidMount() {
        const { acomodacao } = this.props.navigation.state.params;

        axios.get('http://acomodacao-tcc.herokuapp.com/api/v1/acomodacoes/' + acomodacao.id)
            .then(response => {
                this.setState({
                    acomodacao: response.data.acomodacao,
                    urls: response.data.urls
                });
            })
            .catch(error => console.log("Erro: " + error))
    }

    tipoEmTexto() {
        switch (this.state.acomodacao.tipo) {
            case 0:
                return 'Apartamento';
            case 1:
                return 'Casa';
            case 2:
                return 'Hotel';
        }
    }

    render() {
        const { acomodacao } = this.state;
        return (
            <ScrollView>
                {this.state && this.state.acomodacao &&
                    <View>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                            {acomodacao.titulo}
                        </Text>

                        <Text style={{ textAlign: 'center' }}>
                            {this.tipoEmTexto()}
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Capacidade: </Text>
                                <Text>{acomodacao.capacidade}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Preço: </Text>
                                <Text>{acomodacao.preco}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Logradouro: </Text>
                                <Text>{acomodacao.logradouro}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Número: </Text>
                                <Text>{acomodacao.numero}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Complemento: </Text>
                                <Text>{acomodacao.complemento}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Bairro: </Text>
                                <Text>{acomodacao.bairro}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Cidade: </Text>
                                <Text>{acomodacao.cidade}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Estado: </Text>
                                <Text>{acomodacao.estado}</Text>
                            </View>
                        </View>

                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Descrição:</Text>
                        <Text style={{ marginLeft: 10 }}>{acomodacao.descricao}</Text>
                    </View> 
                }
                {this.state.urls.map((url, index) => {
                    return (
                        <View key={index}>
                            <FullWidthImage source={{uri: url}} />
                            <View style = {styles.lineStyle} />
                        </View>
                    )
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
      marginTop: 5,
      borderBottomWidth: 5
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    }
});
  