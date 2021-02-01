const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socketEventSchema = new Schema({
    socket: String,
    type: String,
    eventTime: String //Type Date was not used since it did not return the time in correct format - Date(Date.now()).toString() is used
});


const SocketEvent = mongoose.model('SocketEvent', socketEventSchema);

module.exports = SocketEvent;