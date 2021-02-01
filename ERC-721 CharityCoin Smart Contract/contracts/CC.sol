// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "./ERC721.sol";

contract CCNFT is ERC721 {
    
    uint256 public coinsForSaleCount;
    
    //Each Coin-NFT will have the following data
    struct Coin {
        uint256 id;
        uint256 value;
        string date;
        string ownerName;
        SoldStatus status;
        address payable owner;
    }
    
    enum SoldStatus {FOR_SALE, SOLD, NOT_FOR_SALE}
    
    Coin[] public getCoinsInfobyID;
    
    constructor(string memory _name, string memory _symbol) ERC721(_name,_symbol) {
        
    }
    
    //Function to CreateCoins
    function CreateCoins(string memory _date, string memory _ownerName, uint256 _value) public {
        require(bytes(_date).length > 0, 'The date cannot be empty');
        require(bytes(_ownerName).length > 0, 'The ownerName cannot be empty');
        require(_value > 0 , 'The value cannot be zero');
        
        Coin memory _coin = Coin ({
            id : 0,
            value: _value,
            date : _date,
            ownerName : _ownerName,
            status: SoldStatus.NOT_FOR_SALE, //Intial status will be NOT_FOR_SALE
            owner : msg.sender
        });
        getCoinsInfobyID.push(_coin);
        uint256 _tokenId = getCoinsInfobyID.length - 1;
        _safeMint(msg.sender, _tokenId);
        uint _index = getTokenIndexByID(_tokenId);
        getCoinsInfobyID[_index].id = _index;
        
    }
    
    
    //Function to List CharityCoins for Sale
    function listCoinForSale(uint256 _tokenId) payable public {
        require(msg.sender != address(0));
        address _owner = ownerOf(_tokenId);
        require(msg.sender == _owner);
        uint _index = getTokenIndexByID(_tokenId);
        getCoinsInfobyID[_index].status = SoldStatus.FOR_SALE;
        coinsForSaleCount++;
    }
    
    //Function to Buy Charity Coin
    function buyCoin(uint256 _tokenId) payable public {
        require(_exists(_tokenId),"nonexistant token");
        uint _index = getTokenIndexByID(_tokenId);
        Coin memory _coin = getCoinsInfobyID[_index];
        require(msg.value >= _coin.value);
        require(msg.sender != address(0));
        
        if (msg.value > _coin.value) {
            msg.sender.transfer(msg.value - _coin.value);
        }
        _coin.owner.transfer(_coin.value);
        transferFrom(_coin.owner, msg.sender, _tokenId);
        getCoinsInfobyID[_index].owner = msg.sender;
        getCoinsInfobyID[_index].status = SoldStatus.SOLD;
        coinsForSaleCount--;
    }
}