import React,{Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

import Actions from '../services/graphql';

export default class ListItem extends Component{
    constructor(){
        super()
        this.state ={
            data: {
                Sumber: "",
                Status: false,
                Beban: 0
            },
            buttonLabel: "Mati",
            waitRespons: false
        }
    }
    toggle(k){
        (k)
    }

    async penerima(){
        this.setState({waitRespons: true})
        res = Actions(
            "matikanListrik",
            {sumber: this.state.data.Sumber}
            ).then(
                this.setState({data: res.data.data,waitRespons: false})
            )
        
    }

    async pemancar(){
        this.setState({waitRespons: true})
        let query = {}
        let data = {}
        let stat = false
        if (this.states.data.Status){
            data = Actions(
                "matikanListrik",
                {sumber: this.state.data.Sumber}
                ).then(this.setState({waitRespons: false}))
            stat = data.data.matikanListrik
        }else{
            data = Actions(
                "hidupkanListrik",
                {sumber: this.state.data.Sumber}
                ).then(this.setState({waitRespons: true}))

            stat = data.data.hidupkanListrik
        }
    }

    tombol(){
        if (!this.state.waitRespons){
            let datas = this.state.data
            datas.Status = !this.state.data.Status
            this.setState({data: datas})
            // execute pemancar
            //
            if(this.state.data.Status){
                this.setState({buttonLabel: "Hidup"})
            }else{
                this.setState({buttonLabel: "Mati"})
            }
        }
    }

    render(){
        return(
            <View>
                {
                    this.toggle(this.props.id)
                }
                <Text>{this.state.Sumber} | {this.state.data.Status}</Text>
                <Button title={String(this.state.buttonLabel)} onPress={this.tombol.bind(this)}></Button>
            </View>
        );
    }
}