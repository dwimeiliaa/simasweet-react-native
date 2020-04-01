import React,{Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

import ListItem from './ListItem'

export class List extends Component{
    constructor(){
        super()
        this.state = {data: [
            {Sumber: 1, Status: false, Beban: 120},
            {Sumber: 0, Status: true, Beban: 121}
        ]}
    }
    render(){
        return (
            <View>
                {
                    this.state.data.map((item,indek) => (
                        <ListItem id={indek} sumber={item.Sumber}/>
                    ))
                }
            </View>
        )
    }
}

