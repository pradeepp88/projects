let musicData = [];
let _id = 0;


class Song {
    constructor(band, title, duration, albulm, rating, genre, image) {
        _id = _id + 1;
        this.id = _id;
        this.band = band,
        this.title = title;
        this.duration = duration;
        this.albulm = albulm;
        this.rating = rating;
        this.genre = genre;
        this.imageName = image;
    }
}
const seedData = () => {
    musicData.push(new Song("Journey","Don't Stop Believing","3:50","Greatest Hits","5", "Hard Rock", "Journey.JPG"));
    musicData.push(new Song("Def Leppard","Photograph","3:50","Histeria",5, "Hard Rock", "Def-Lepard.JPG"));
    musicData.push(new Song("Kiss",	"Lord of Thunder", "5:53","Destroyer",5, "Hard Rock", "Kiss.JPG"));
    musicData.push(new Song("Ozzy Osbourne","Crazy Train","4:56","Blizzard of Oz",5, "Hard Rock", "Blizzard-Of-Oz.jpg"));
    musicData.push(new Song("Guns N Roses",	"Paridise City","6:46","Greatest Hits",5, "Hard Rock", "Guns-Roses.JPG"));
    musicData.push(new Song("Scorpions","Big City Nights","4:12","Love At First Sting",5, "Hard Rock", "Love-At-First-Sting.jpg"));
    musicData.push(new Song("Whitesnake","Still of the Night","6:39","Whitesnake",5, "Hard Rock", "White-Snake.jpg"));
    musicData.push(new Song("Motley Crue","Too Fast For Love","5:33","Motley Crue",	5, "Hard Rock", "Motley-Crue.JPG"));
    musicData.push(new Song("Jason Aldean", "Dirt Road Anthem", "3:49", "My Kind of Party", 4, "Country Rock", "My-Kind-Of-Party.jpg"))
    musicData.push(new Song("Hardy", "My Kind of Living", "3:19", "HixTape Vol 1", 4, "Country Rock", "Hix-Tape.jpg"))
    musicData.push(new Song("Jason Aldean", " Tattoos an Tequila", "4:44", "We Back", 4, "Country Rock", "We-Back.jpg"))
    musicData.push(new Song("Eric Church", "Springsteen", "3:35", "Chief", 4, "Country Rock", "Chief.jpg"))
    musicData.push(new Song("Kip Moore", "Wild Ones", "3:23", "Wild Ones", 4, "Country Rock", "Wild-Ones.jpg"))
    musicData.push(new Song("The Cadillac Three", "Tabasco & Sweet Tea", "4:40", "Tabasco & Sweet Tea", 4, "Country Rock", "The-Cadillac-Three.jpg"))
    musicData.push(new Song("2 Pac", "All Eyez On Me", "4:33", "All Eyez On Me", 5, "Hip Hop", "2-Pac.jpg"))
   
}


const init = () => {
    seedData();
    console.log(`Init called - music data created..`);
}

const getMusicData = () => {
    console.log(`Music data list has a length: ${musicData.length}`)
    //console.log(`music data: ${musicData}`)
    return musicData;
}

const doesPropEqualsText = (input, property) => {
    return !input || property.toLowerCase().includes(input.toLowerCase());
}

const filterMusic = (genre, artist, title, albulm) => {
    var music = musicData.filter(s => doesPropEqualsText(genre, s.genre)
        && doesPropEqualsText(artist, s.band)
        && doesPropEqualsText(title, s.title)
        && doesPropEqualsText(albulm, s.albulm));

    if(!music || music.length === 0) {
        console.error(`music with not found!!`);
        return null;
    }
    
    console.log(`filtered ${music.length} songs..with artist: ${artist}, title: ${title}, albulm: ${albulm}, genre: ${genre}`)
    return music;
}

const addFavorite = (id) => {
    const song = musicData.filter(s => s.id == id);
    if(!song || song.length === 0) {
        console.error(`song with not found!!`);
        return null;
    }
    console.log(`Add favorite song - id: ${song[0].id}, artist: ${song[0].band}, title: ${song[0].title}`);
    return song;
}

const downloadSong = (id) => {
    const song = musicData.filter(s => s.id == id);
    if(!song || song.length === 0) {
        console.error(`song with not found!!`);
        return null;
    }
    console.log(`Download song - id: ${song[0].id}, artist: ${song[0].band}, title: ${song[0].title}`);
}

module.exports = {
    init: init,
    getMusicData: getMusicData,
    filterMusic: filterMusic,
    addFavorite: addFavorite,
    downloadSong: downloadSong
}