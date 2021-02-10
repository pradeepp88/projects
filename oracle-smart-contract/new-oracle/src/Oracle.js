import React, { Component } from 'react';
import Web3 from 'web3';



class Oracle extends Component {

    state = {
        account: '',
        address: '',
        price: null,
        volume: null
    }

   
    setContract = async (e)=>{
       e.preventDefault();
       let abi = [
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "symbol",
                    "type": "bytes4"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "volume",
                    "type": "uint256"
                }
            ],
            "name": "setStock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "symbol",
                    "type": "bytes4"
                }
            ],
            "name": "getStockPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "symbol",
                    "type": "bytes4"
                }
            ],
            "name": "getStockVolume",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
       const contractAddress = '0x6FB9C74aD3C186dc213bfc43975383963A2eF88f';
       const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
       const accounts = await web3.eth.getAccounts()
       console.log("Account 0 = ", accounts[0] )
       const stockQuote = new web3.eth.Contract(abi, contractAddress)
       var retPrice = await stockQuote.methods.getStockPrice(Web3.utils.fromAscii("AAAA")).call();
       var retVolume = await stockQuote.methods.getStockVolume(Web3.utils.fromAscii("AAAA")).call();
       this.setState({
        account: accounts[0],
        address: contractAddress,
        price: retPrice,
        volume: retVolume
    })
       console.log(retPrice, retVolume);

   }
   
   render() { 
        return ( 
            <>
                <p>Symbol: {this.props.data.symbol}</p>
                <p>Price: {this.props.data.price}</p>
                <p>Volume: {this.props.data.volume}</p>
                <button onClick={this.setContract}> Read value from Contract </button>
                <p>Account: {this.state.account}</p>
                <p>Contract Address: {this.state.address}</p>
                <p>Price: {this.state.price}</p>
                <p>Volume: {this.state.volume}</p>
            </>
         );
    }
}
 
export default Oracle;