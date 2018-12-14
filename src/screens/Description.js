import React, { Component } from 'react';
import { ScrollView, Image, Dimensions, Text } from 'react-native';

export default class Description extends Component {
    static navigationOptions = {
        title: 'Description'
    }

    render() {
        const { acomodacao } = this.props.navigation.state.params;

        return (
            <ScrollView>
               {/* <Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                /> */}
                <Text style={{padding:10, fontSize:20}}>{acomodacao.titulo}</Text>
                <Text style={{padding:10}}>{acomodacao.descricao}</Text>
           </ScrollView> 
        );
    }
}