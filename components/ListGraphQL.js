import React,{Component} from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';
import Actions from '../services/graphql'
import ListItem from './ListItem'

export class List extends Component{
    constructor(){
        super()
        this.state = {data: []}
    }
    t(){
     
    }
    componentDidMount(){

        setInterval(() =>{
            this.getListrik()
        },5000)
    }

    

    async getListrik(){
        this.datas = []
         Actions("daftarListrik",null)
            .then((e) =>{
                // datas = datas.data.semuaListrik,
                // alert(datas)
                    if (e.errors != null){
                        //alert(JSON.stringify(e))
                    }else{
                        //alert(JSON.stringify(e.data.semuaListrik))
                        this.datas = e.data.semuaListrik
                        this.setState({data: this.datas})
                       // alert("State: " + JSON.stringify(this.state.data))
                    }
                }
            )
            
       // this.setState({data: datas})
    }
    styles = StyleSheet.create({

    })

    render(){
        
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}>
                {
                    this.state.data.map((item,indek) => (
                        <ListItem
                            key={'_' + Math.random().toString(36).substr(2, 9)} 
                            datas={item}
                        />
                    ))
                }
            </View>
        )
    }
}

