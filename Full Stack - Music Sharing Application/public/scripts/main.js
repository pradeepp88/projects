
//// Constants and variables
let favoriteData = [];
let searchResultsContainer = null;
let favoriteListContainer = null;
let txtGenre = null;
let txtArtist = null;
let txtSong = null;
let txtAlbum = null;


const hasSearchFilters = () => {
    return txtArtist.value || txtSong.value || txtAlbulm.value || txtGenre.value;
}


//// EVENT HANDLERS
const handleSearch = () => {
    console.log('handle search');

    filterAndLoadResults();
}

const handleInputKeyUp = (e) => {
    console.log('handle input key up');
    // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Cancel the default action, if needed
    e.preventDefault();

    filterAndLoadResults();
  }
}

const filterAndLoadResults = () => {

    if(!hasSearchFilters()) {
        alert('Please select a search filter');
        return;
    }
    
    const genre = txtGenre.value;
    const artist = txtArtist.value;
    const title = txtSong.value;
    const albulm = txtAlbulm.value;

    //updated to /search/filterMusic
    const request = new Request(`http://localhost:3004/search/filtermusic?genre=${genre}&artist=${artist}&title=${title}&albulm=${albulm}`);

    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res)
             loadData(res);
        })
        .catch(err => {
            console.error(err)
        });
}


const handleReset = () => {
    console.log('handle reset');
    txtGenre.value = null;
    txtArtist.value = null;
    txtSong.value = null;
}


const handleFavoriteClick = (id) => {
    
    const request = new Request(`http://localhost:3004/search/favorite?id=${id}`); //Updated to /search/favorite
    var song = null;
    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res)
            song = res;

            if(!song) {
                console.warn(`song ${id} not found, cannot add to favorties`);
                 return;
             }
             favoriteData.push(song);
             createFavoriteImage(song); 
             console.log(favoriteData);
        })
        .catch(err => {
            console.error(err)
        });
}

const handleRemoveFavoriteClick = (e) => {
    if(!e.target) {
        return;
    }
    favoriteListContainer.removeChild(e.target);
}
const handleSongButtonClick = (e) => {
    if(!e.target) {
        return;
    }

    if(e.target.className === 'btn-favorite') {
        console.log('favorite button click');
        handleFavoriteClick(e.target.getAttribute("data-key"));
    }
    else if (e.target.className === 'btn-download'){
        alert(`Downloading Song with id: ${e.target.getAttribute("data-key")}`);
        socket.emit('download',e.target.getAttribute("data-key"));
    }
        
    console.log(e.target.getAttribute("data-key"));
    
}
const setupHandlers = () => {
    getElement('#btnSearch').addEventListener('click', handleSearch);
    getElement('#btnReset').addEventListener('click', handleReset);
    getAllElements('input')
                .forEach(input => input.addEventListener('keyup', handleInputKeyUp));

    getElement('#searchResults').addEventListener('click', handleSongButtonClick);
    getElement('#favoriteListContainer').addEventListener('click', handleRemoveFavoriteClick);
}


const loadData = (data) => {
    removeTableRows();

    for(const song of data) {
        console.log(song);
        const songRow = buildTableRow(song);
        searchResultsContainer.append(songRow);
    }
}

//// DOM Manipulation & Traversal /////
const getElement = (selector) => {
    return document.querySelector(selector);
}
const getAllElements = (selector) => {
    return document.querySelectorAll(selector);
}

const removeTableRows = () => {
    while(searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    }
}

const buildTableRow = (songObj) => {
    const row = createElement('tr');
    for(const key in songObj){
        if(key === 'id' || key === 'imageName') continue;
        const colTitle = createElement('td', songObj[key]);
        row.append(colTitle);
    }
    const liFaDownload = createElement('li', null, "fas fa-download");
    createButtonColumn(row, 'Favorite', 'btn-favorite', songObj.id, liFaDownload);
    createButtonColumn(row, 'Download', 'btn-download', songObj.id, liFaDownload);

    return row;
}


const createFavoriteImage = (song) => {

    const imageName = song[0].imageName;
    const imgFilePath = `images\\${imageName}`;
    const imgElement = createElement('img', null, 'favorite-albulm-item');
    imgElement.src = imgFilePath;
    favoriteListContainer.append(imgElement);

}

const createButtonColumn = (rowElement, text, className, key, innerHtml) => {
    const buttonCol = createElement('td', null, null, key);
    const btnElement = createElement('button', text, className, key, innerHtml);
    buttonCol.append(btnElement);

     rowElement.append(buttonCol);
}
const createElement = (element, text, className, key, innerHtml) => {
    let elm = document.createElement(element);
    if(text)
        elm.textContent = text;
    if(className)
        elm.className = className;
    if(key)
        elm.dataset.key = key; //setAttribute("data-num", i);
    if(innerHtml)
        elm.innerHtml = innerHtml.outerHtml;
    return elm;
}

const inititalize = () => {
    searchResultsContainer = document.querySelector('#searchResults');
    favoriteListContainer = document.querySelector('#favoriteListContainer')
    txtGenre = document.querySelector('#txtGenre');
    txtArtist = document.querySelector('#txtArtist');
    txtSong = document.querySelector('#txtSong');
    txtAlbum = document.querySelector('#txtAlbum');
}
/// Window Load
window.onload = () => {
    console.log('window loaded..');
    setupHandlers();
    inititalize();
}

//socket setup
var socket = io.connect('http://localhost:3004');

// event listeners from server
socket.on('connect', (data)=>{ 
  console.log(`Server connected with socket ID: ${socket.id} and event saved to database`); 
});

socket.on('disconnect', ()=>{ 
        console.log(`Server disconnected`);
        alert('Connection to Server Lost: Restart Server and try again');   
});

socket.on('download-received',(downloadId)=>{
    console.log(`Download request received by server for song ID: ${downloadId} and event saved to database`);
});

socket.on('connect_error', (err)=>{
    console.log('Connection to Server Lost: Restart Server and try again');
    alert('Connection to Server Lost: Restart Server and try again');
    
});