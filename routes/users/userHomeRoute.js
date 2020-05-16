const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");

// this page will serve to access the username and display a message greeting the user.

const userHomeRoute = async(req, res) => {
    // this route gets every record in the database that has the Id of "req.id"
    try {
        res.send("Welcome to Celeste Speed Runner!!!");
    } catch (error) {
        console.log(error);
    }
}

const userHomeRouter = express.Router();
userHomeRouter.route("/").get(bodyParser.json(), userHomeRoute);
module.exports = {userHomeRouter};
