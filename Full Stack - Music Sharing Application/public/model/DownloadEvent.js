const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DownloadEventSchema = new Schema({
    socket: String,
    songId: String,
    downloadTime: String //Type Date was not used since it did not return the time in correct format - Date(Date.now()).toString() is used
});


const DownloadEvent = mongoose.model('DownloadEvent', DownloadEventSchema);

module.exports = DownloadEvent;