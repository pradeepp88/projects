/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Oracle from './Oracle'; 

class App extends Component {
	constructor(props){
		super(props);
	}
	
	state = { 
		symbol: '',
		price: null,
		volume: null
	}

	clickHandler = async(e)=> {
		e.preventDefault(); 
		let result = await fetch("http://localhost:8000/");

		let json = await result.json();
				
		console.log(`Symbol: ${json.symbol}`);
		console.log(`Price: ${json.price}`);
		console.log(`Volume: ${json.volume}`);
		
		this.setState({
			symbol: json.symbol,
			price: json.price,
			volume: json.volume
		})

		
	}


	render() { 
		return ( 
			<>
			<button onClick={this.clickHandler}> Fetch Data from Oracle </button>
 			<Oracle data={this.state} />
			</>
		 );
	}
}
 
export default App;
