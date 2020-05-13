
const mongoose = require("mongoose");

// every time a user uploads a screenshot a 'record' will be produced.

const userRecords = new mongoose.Schema({
    record: {
        userId: String,  //user who set the record.
        recordInfo: {
            levelName: String,
            deathsRecorded: Number,
            berriesCollected: String,
            timePlayed: String,
        },
        dateRecorded: Date,
    },
});

module.exports = mongoose.model('records', userRecords);