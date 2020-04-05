import React,{Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
    Button,
    Badge,
    Icon
} from 'react-native-elements';

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
       // alert(JSON.stringify(this.state))
    }

    componentDidMount(props){
        this.setState({data: this.props.datas});
        this.setState({
            buttonLabel: !this.state.data.Status ? "Hidupkan": "Matikan" })
    }

    kondisinya(k){
        if(!this.state.data.Status){
            return "Hidupkan"
        }else{
            return "Matikan"
        }
    }

    async penerima(){
        this.setState({waitRespons: true})
        await Actions(
            "listrik",
            {sumber: this.state.data.Sumber}
            ).then((e) =>{
                    if (e === undefined){
                        alert("Gagal meminta ke server")
                    }else if (e.errors == null){
                        this.setState({data: e.data.listrik})
                        //alert(JSON.stringify(this.state))
                        
                    }else{
                      //alert(JSON.stringify(e))
                      
                    }
                    this.Wait()
                }
            )
    }

    async pemancar(){
        this.setState({waitRespons: true})
        //alert(JSON.stringify(this.state.data.Status))
        if (!this.state.data.Status){
            await Actions(
                "matikanListrik",
                {sumber: this.state.data.Sumber}
                ).then((e) =>{
                    if(e === undefined){
                        alert("Gagal meminta ke server")
                        this.Wait()
                    }else if(e.errors == null){
                        this.penerima()   
                    }else{
                     //   alert(JSON.stringify(e))
                    }
                })
        }else{
            //alert(JSON.stringify(this.state.data))
           await Actions(
                "hidupkanListrik",
                {sumber: this.state.data.Sumber}
                ).then((e) =>{
                    if(e === undefined){
                        alert("Gagal meminta ke server")
                        this.Wait()
                    }else if(e.errors == null){
                        this.penerima()
                    }else{
                       // alert(JSON.stringify(e))
                    }
                })
        }
    }
    Wait(){
        this.setState({waitRespons: !this.state.waitRespons})
        this.setState({buttonLabel: this.state.waitRespons ? "Tunggu" : (this.state.data.Status ? "Matikan": "Hidupkan" )})
    }

   async tombol(){
        if (!this.state.waitRespons){
            let datas = this.state.data
            datas.Status = !this.state.data.Status
            this.setState({data: datas})
            // execute pemancar
            
            this.Wait()
            await this.pemancar()
            // if(this.state.data.Status){
            //     this.setState({buttonLabel: "Hidup"})
            // }else{
            //     this.setState({buttonLabel: "Mati"})
            // }
            this.kondisinya(this.state.data.Status)
        }else{
            alert("Sedang Proses")
        }
    }
    hidup(states){
        if(states){
            return(
                <Badge value="Status: Hidup" style={this.styles.padText}  status="success"/>
            )
        }else{
            return(
                <Badge value="Status: Mati" style={this.styles.padText} status="error"/>
            )
        }
    }
    styles = StyleSheet.create({
        container: {
          height: '50%',
        },
        padText:{
            margin: 10
        },
        card:{
            borderWidth: 2,
            padding: 6,
            margin: 10,
            borderColor: '#e0e0e0',
            borderRadius: 8,
            width: '84%'
        },
        badgeHandler: {
            flexDirection: 'row' ,
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 10,
            paddingTop: 12
        },
        text: { textAlign: 'center' },
      });
    render(){
        return(
            <View style={this.styles.card}>
                <View style={this.styles.badgeHandler}>
                    <Badge value={"Sumber:  "+ this.state.data.Sumber+"  "} style={this.styles.padText} status="success" />
                    {
                        this.hidup(this.state.data.Status)
                       
                    }
                    <Badge value={"Beban: " + this.state.data.Beban + " Watt"} style={this.styles.padText} status="primary" />
                </View>
                <Button style={{borderRadius: 80}} title={String(this.state.buttonLabel)} onPress={this.tombol.bind(this)}></Button>
            </View>
        );
    }
}