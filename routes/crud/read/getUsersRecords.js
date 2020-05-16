const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser");
const userRecords = require("../../../models/record");

// this page will serve to access the username and display a message greeting the user.
const recordFinder = (user, levelName) => {
    // sorted in ascending order by the amount of time played for a given level.
    return userRecords.find( {
        "record.userId": user,
        "record.recordInfo.levelName": levelName
        }).sort("record.recordInfo.timePlayed").exec();
}

const allRecordsRoute = async(req, res) => {
    // this route gets every record in the database that has the Id of "req.id"
    try {
        const user = req.params.userId;
        const forsakenCityTimes = await recordFinder(user, "Forsaken City");
        const oldSiteTimes = await recordFinder(user, "Old Site");
        const celestialResortTimes = await recordFinder(user, "Celestial Resort");
        const goldenRidgeTimes = await recordFinder(user, "Golden Ridge");
        const mirrorTempleTimes = await recordFinder(user, "Mirror Temple");
        const reflectionTimes = await recordFinder(user, "Reflection");
        const theSummitTimes = await recordFinder(user, "The Summit");
        
        const bestUserTimes = [
            forsakenCityTimes[0],
            oldSiteTimes[0],
            celestialResortTimes[0],
            goldenRidgeTimes[0],
            mirrorTempleTimes[0],
            reflectionTimes[0],
            theSummitTimes[0]
        ];

        res.send(bestUserTimes);
    } catch (error) {
        console.log(error);
    }
}

const allRecordsRouter = express.Router();

allRecordsRouter.route("/records/:userId").get(bodyParser.json(), allRecordsRoute);
module.exports = { allRecordsRouter};
