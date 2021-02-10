import React, { Component } from 'react';
import Web3 from 'web3';

class UpdateContract extends Component {

    state = {
        account: '',
        address: '',
        symbol: '',
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

    const Txo = require('ethereumjs-tx');
    var Tx = Txo.Transaction;   
    const contractAddress = '0x6FB9C74aD3C186dc213bfc43975383963A2eF88f';
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const accounts = await web3.eth.getAccounts()
    console.log("Account 0 = ", accounts[0] )
    const stockQuote = new web3.eth.Contract(abi, contractAddress)
    const account = '0xa1f2603ce7C77588431f2E0D96397fd0b759ECa8';

    const privateKey = Buffer.from(`d8f6e2a59f07baa40eb7cb01eea4d4afa8b25dd6934c1cae2f39dc036b1c8135`, 'hex');
    var TestContract = new web3.eth.Contract(abi, contractAddress);
    console.log(TestContract.methods);
    

    let symbol = this.props.data.symbol;
    let price = Math.round(this.props.data.price);
    let volume = this.props.data.volume;

    let symbolEncoded = Web3.utils.fromAscii(symbol);
    console.log(symbolEncoded);

    const _data = TestContract.methods.setStock(symbolEncoded,price,volume).encodeABI();

    web3.eth.getTransactionCount(account).then(async nonce => {
        var rawTx = {
        nonce: nonce,
        gasPrice: `0x20000000000`,
        gasLimit: `0x27511`,
        to: contractAddress,
        value: 0,
        data: _data
        }

        var tx = new Tx(rawTx);
        tx.sign(privateKey);
        var serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

        this.setState({
            account: accounts[0],
            address: contractAddress,
            symbol: symbol,
            price: price,
            volume: volume
        })
        console.log('Contract updated Successfully!')



    })
}
   
   render() { 
        return ( 
            <>
                <button onClick={this.setContract}> Sign Contract with new values </button>
                <p>Account: {this.state.account}</p>
                <p>Contract Address: {this.state.address}</p>
                <p>Symbol: {this.state.symbol}</p>
                <p>Price: {this.state.price}</p>
                <p>Volume: {this.state.volume}</p>
            </>
         );
    }
}
 
export default UpdateContract;