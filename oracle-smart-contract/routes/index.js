var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";

  const getData = async url => {
    const response = await fetch(url);
    const json = await response.json();
    //console.log(json);
    const stock = {};
    stock.symbol =  json['Global Quote']['01. symbol'];
    stock.price =  json['Global Quote']['05. price'];
    stock.volume =  json['Global Quote']['06. volume'];
    console.log('Sending stock details',stock);

    res.json({ msg: 'Stock details received from server', symbol: stock.symbol, price: stock.price, volume:stock.volume })
    
  };

  getData(url);
  
  
});

module.exports = router;
