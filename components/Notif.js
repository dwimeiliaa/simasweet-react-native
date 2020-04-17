import React,{Component} from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';

import {
    Badge
} from 'react-native-elements';
import Actions from '../services/graphql'

export class Notif extends Component{
  	constructor(props){
        	super(props)
        	this.state ={
            		bebanBerlebih: false,
            		bebanTotal: 0
       	 	}
    	}

	componentDidMount(){
        setInterval(()=>{this.getListrik()},5000)
	   
  	}

  	async getListrik(){
	
  	await Actions("daftarListrik",null)
            .then((e) =>{
                    if (e.errors != null){
                    }else{
                        let datas = e.data.semuaListrik
                        let watt = 0
			datas.map((item)=>{
				if(item.Status){
				watt += item.Beban
				}
			})
			this.setState({bebanTotal: watt})
			this.cekBelebih()
                    }
                }
            )

  	}
	cekBelebih(){
		if(this.state.bebanTotal > 440){
			this.setState({bebanBerlebih: true})
		}else{
			this.setState({bebanBerlebih: false})
		}
	}
    styles = StyleSheet.create({
        container: {
          height: '50%',
        },
        padText:{
            padding: 10,
            color: 'white'
        },
        card:{
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            margin: 10,
            borderColor: '#e0e0e0',
            borderRadius: 8,
	    justifyContent: 'center',
	    alignItems: 'center',
            width: '100%'
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
            <Badge
             style={this.styles.padText}
             value={<Text style={{fontSize: 15,color: 'white',padding: 10}}>{"Total Beban: "+ this.state.bebanTotal+" Watt"}</Text>}
             status="primary" />
            <Badge 
                style={this.styles.padText}
                value={<Text style={{fontSize: 15,color: 'white',padding: 10}}>{this.state.bebanBerlebih ?
                    "Beban Melebih Batas Maksimum": "Beban Aman"}</Text>}
                status={this.state.bebanBerlebih ?
                    "Error": "Succes"}  />
		</View>
		)
	}
		

}
