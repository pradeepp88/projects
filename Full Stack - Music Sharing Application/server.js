const express = require('express')
const musicFactory = require('./modules/musicFactory')
const path = require('path')
var bodyParser = require('body-parser')
const app = express()


//setup mongoose
const mongoose = require('mongoose')
const DownloadEvent = require('./public/model/DownloadEvent');
const SocketEvent = require('./public/model/SocketEvent');
const connectionString = "mongodb://localhost/musicApp";
mongoose
.connect(connectionString, { useNewUrlParser: true } )
.then( () => { 
    console.log(`Mongoose connected successfully to database: ${connectionString}`);
   
},
error => { 
    console.log( "Mongoose could not connected to database: " + error); 
});

// Setup Socket
var socket = require('socket.io')

//Setup Express

app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

musicFactory.init();


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/napster.htm'));
})

app.get('/musicData', function(req, res) {
  const data = musicFactory.getMusicData();
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.get('/search/filterMusic', function(req, res) { //updated to /search/filterMusic
  const queryStr = req.query;
  console.log(queryStr)
  const data = musicFactory.filterMusic(queryStr.genre, queryStr.band, queryStr.title, queryStr.albulm)
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.get('/search/favorite', (req, res) => { //updated to /search/filterMusic
  const queryStr = req.query;
  console.log(queryStr)
  const song = musicFactory.addFavorite(queryStr.id);
  res.status(200);
  res.send(JSON.stringify(song));
})

app.post('/download', (req, res) => {
  const params = req.body;
  console.log(params);
  musicFactory.downloadSong(params.id);
  res.status(200);
  res.send(`Downloaded song with id: ${params.id}`);
});

var server = app.listen(3004, function () {
  console.log('Listening on port 3004!')
})

//setup socket 
var io = socket(server);

//socket listeners
io.on('connection', (socket) => {
  //Socket Event on connect  
  console.log('Connection accepted with socket ID: '+socket.id);
  //save to database
  var SocketEventNew = new SocketEvent({
    socket: socket.id,
    type: 'Connected',
    eventTime: Date(Date.now()).toString() //Save the String Format of Current Date and Time
  });

  SocketEventNew.save().then(()=>{
    console.log(`SocketEvent of type: "${SocketEventNew.type}" saved to database successfully at ${SocketEventNew.eventTime}`);
  });

  //Socket Event on Download
  socket.on('download', (downloadId)=>{
    console.log(`Received client message to download song with id: ${downloadId}`);
    socket.emit('download-received',downloadId);
    //save to database
    var DownloadEventNew = new DownloadEvent({
      socket: socket.id,
      songId: downloadId,
      downloadTime: Date(Date.now()).toString() //Save the String Format of Current Date and Time
    });
  
    DownloadEventNew.save().then(()=>{
      console.log(`DownloadEvent with songID ${DownloadEventNew.songId} saved to database successfully at ${DownloadEventNew.downloadTime}`);
    });
  });
 
  
  //Socket Event on Disconnect
  socket.on('disconnect',()=>{
    console.log('Client Disconnected')
    //save to database
    var SocketEventNew = new SocketEvent({
      socket: socket.id,
      type: 'Disconnected',
      eventTime: Date(Date.now()).toString() //Save the String Format of Current Date and Time
    });
    SocketEventNew.save().then(()=>{
      console.log(`SocketEvent of type: "${SocketEventNew.type}" saved to database successfully at ${SocketEventNew.eventTime}`);
    });
  });

});


