const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser");
const userRecords = require("../../../models/record");

// this page will serve to access the username and display a message greeting the user.

const allRecordsRoute = async(req, res) => {
    // this route gets every record in the database that has the Id of "req.id"
    try {
        const user = "teddy";
        const userRecordsArray = await userRecords.find( {
            "record.userId": user 
            }).exec();
        
        console.log(userRecordsArray);
        res.send(userRecordsArray);
    } catch (error) {
        console.log(error);
    }
}

const allRecordsRouter = express.Router();

allRecordsRouter.route("/records/:userId").get(bodyParser.json(), allRecordsRoute);
module.exports = { allRecordsRouter};
