const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser");
const userRecords = require("../../../models/record");

// this page will serve to access the username and display a message greeting the user.

const allRecordsRoute = async(req, res) => {
    // make sure to also pass the bearer token when routing here because it is after the tokenAuth
    // this route gets every record in the database that has the Id of "req.id"
    try {
        const user = req.params.userId;
        const userRecordsArray = await userRecords.find( {
            "record.userId": user 
            }).exec();
        
        console.log(userRecordsArray);
        res.send( userRecordsArray);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const allResultsRouter = express.Router();

allResultsRouter.route("/for/:userId").get(bodyParser.json(), allRecordsRoute);
module.exports = { allResultsRouter};
