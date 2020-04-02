import React,{Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

import Actions from '../services/graphql';

export default class ListItem extends Component{
    constructor(props){
        super(props)
        this.state ={
            data: {
                Sumber: "",
                Status: false,
                Beban: 0
            },
            buttonLabel: "Mati",
            waitRespons: false,
            proped: false
        }
        
    }

    componentDidMount(props){
        this.setState({data: this.props.datas});
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
                ).then(this.Wait())
            stat = data.data.matikanListrik
        }else{
            data = Actions(
                "hidupkanListrik",
                {sumber: this.state.data.Sumber}
                ).then(this.Wait())

            stat = data.data.hidupkanListrik
        }
    }
    Wait(){
        this.setState({waitRespons: !this.state.waitRespons})
        this.setState({buttonLabel: this.state.waitRespons ? "Tunggu" : "Siap"})
    }

    tombol(){
        if (!this.state.waitRespons){
            let datas = this.state.data
            datas.Status = !this.state.data.Status
            this.setState({data: datas})
            // execute pemancar
            //
            this.Wait()
            if(this.state.data.Status){
                this.setState({buttonLabel: "Hidup"})
            }else{
                this.setState({buttonLabel: "Mati"})
            }
        }else{
            this.Wait()
        }
    }


    render(){
        return(
            <View>
                <Text>{JSON.stringify(this.state.data.Status)}</Text>
                <Button title={String(this.state.buttonLabel)} onPress={this.tombol.bind(this)}></Button>
            </View>
        );
    }
}