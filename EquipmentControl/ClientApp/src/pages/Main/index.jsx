import React, { Component } from 'react';

import {APIHierarchy,APIEquipment} from '../../support/constants';
import {EquipmentContext} from '../../context';
import { EquipmentContainer } from '../../components/EquipmentContainer';
import './main.css';

import {Menu} from '../../components/Menu';
import { AddUnit } from '../../components/AddUnit';

class Main extends Component {
	constructor (props) {
		super(props);
		this.state = {
            hierarchy:[],
            equipment:[],
            currentListOfId:[],
        }
        this.loadHierarchy=this.loadHierarchy.bind(this);
        this.loadEquipment=this.loadEquipment.bind(this);
        this.onMenuElemClick=this.onMenuElemClick.bind(this);
    }
//the array has the structure [id, comunn1, ..., columnN], where column is the tree level
    loadHierarchy() {
		fetch(APIHierarchy,
			{
			method: 'GET',
			headers: {
                'Content-Type' : 'application/json'
            }
			})
			.then(response => response.json())
			.then(data => {
                const currentListOfId = [...new Set(data.map(item => item.id))];
				this.setState({
                    hierarchy:data,
                    currentListOfId:currentListOfId
                })
			})
    }
    onMenuElemClick(list){
        this.setState({currentListOfId:list});
    }
//load equipment according to current room lists
    loadEquipment() {  
		fetch(APIEquipment,
			{
			method: 'POST',
			headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.currentListOfId)
            }).then(response =>response.json())
            .then(data => this.setState({equipment:data})
            )
    }
    
    componentDidMount(){
        this.loadHierarchy();
    }
//condition in order not to fall into loop
    componentDidUpdate(prevProps,prevState) {
        if (this.state.currentListOfId !== prevState.currentListOfId) {
            this.loadEquipment();
        }
    }

	render() {
		return (
            <EquipmentContext.Provider
                value={{
                    onDelete: this.loadEquipment,
                    onChange: this.loadEquipment,
                    onAdd: this.loadEquipment,
                }}
            >
                <div className="main">
                    {this.state.hierarchy.length>0 && 
                    <Menu
                        hierarchy={this.state.hierarchy}
                        onMenuElemClick={this.onMenuElemClick}
                    />}
                    <div className='main-content'>
                        <AddUnit
                            hierarchy={this.state.hierarchy}
                        />
                        <EquipmentContainer
                            equipment={this.state.equipment}
                        />
                    </div>
                </div>
            </EquipmentContext.Provider>
		);
	}
}
  export default Main;