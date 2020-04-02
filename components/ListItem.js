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
        alert(JSON.stringify(this.state))
    }

    componentDidMount(props){
        this.setState({data: this.props.datas});
    }

    async penerima(){
        this.setState({waitRespons: true})
        await Actions(
            "listrik",
            {sumber: this.state.data.Sumber}
            ).then((e) =>{
                    if (e.errors == null){
                        this.setState({data: e.data.listrik})
                        this.Wait()
                        //alert(JSON.stringify(this.state))
                        
                    }else{
                      //  alert(JSON.stringify(e))
                    }
                }
            )
    }

    async pemancar(){
        this.setState({waitRespons: true})
        //alert(JSON.stringify(this.state.data.Status))
        if (!this.state.data.Status){
            alert(JSON.stringify(this.state.data))
            await Actions(
                "matikanListrik",
                {sumber: this.state.data.Sumber}
                ).then((e) =>{
                    if(e.errors == null){
                        this.penerima()   
                    }else{
                        alert(JSON.stringify(e))
                    }
                })
        }else{
            //alert(JSON.stringify(this.state.data))
           await Actions(
                "hidupkanListrik",
                {sumber: this.state.data.Sumber}
                ).then((e) =>{
                    if(e.errors == null){
                        this.penerima()
                    }else{
                        alert(JSON.stringify(e))
                    }
                })
        }
    }
    Wait(){
        this.setState({waitRespons: !this.state.waitRespons})
        this.setState({buttonLabel: this.state.waitRespons ? "Tunggu" : "Siap"})
    }

   async tombol(){
        if (!this.state.waitRespons){
            let datas = this.state.data
            datas.Status = !this.state.data.Status
            this.setState({data: datas})
            // execute pemancar
            
            this.Wait()
            await this.pemancar()
            if(this.state.data.Status){
                this.setState({buttonLabel: "Hidup"})
            }else{
                this.setState({buttonLabel: "Mati"})
            }
        }else{
            alert("Sedang Proses")
        }
    }
    render(){
        return(
            <View>
                <Text>{JSON.stringify(this.state.data)}</Text>
                <Button title={String(this.state.buttonLabel)} onPress={this.tombol.bind(this)}></Button>
            </View>
        );
    }
}