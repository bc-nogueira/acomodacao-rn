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

    render() {
        return (
            <ScrollView>
                {this.state && this.state.acomodacao &&
                    <View>
                        <Text style={{padding:10, fontSize:20}}>{this.state.acomodacao.titulo}</Text>
                        <Text style={{padding:10}}>{this.state.acomodacao.descricao}</Text>
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
  