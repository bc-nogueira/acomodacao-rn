import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Text } from 'react-native';
import axios from 'axios';

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
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View>
                {this.state && this.state.acomodacao &&
                    <ScrollView>
                        {/* <Image 
                                source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                                style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                            /> */}
                        <Text style={{padding:10, fontSize:20}}>{this.state.acomodacao.titulo}</Text>
                        <Text style={{padding:10}}>{this.state.acomodacao.descricao}</Text>
                    </ScrollView> 
                }
            </View>
        );
    }
}