const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("../../lib/middleware/bodyParser");
const userPassword = require("../../models/user")
const userRecords = require("../../models/record");
const bcrypt = require("bcrypt");

const mongoUrl = "mongodb://127.0.0.1:27017/celesteDB";


const userProfileInformation = async (username) => {
  try {
    const records = await userRecords.find({username});
    console.log(records);
    
  } catch (error) {
    throw new Error("Internal server error");
  }

}

const confirmUserExists = async (username) => {
  try {
    console.log("confirming the user exists");
    const results = await userPassword.findOne({
      username,
    })

    console.log("Results? ", results)
    if (results && results.username === username) {
      return true;
    }

    console.log("Falsefhfhfhfh")
    return false;
  } catch (error) {
    throw new Error("Internal server error");
  }
};


const confirmUser = async (username, password) => {
  try {
    const results = await userPassword.findOne({
      username,
    });

    console.log("username and password from confirmUser is: ", results );
    console.log("the password to check is ", password);

    if (results && (await bcrypt.compare(password, results.password))) {
      // console.log("the results were true!");
      
      return true;
    }
    else{
      return false;
    }


  } catch (error) {
    throw new Error('Internal server erroradsfasdfasd');
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userPassword({
      username,
      password: hashedPassword,
    });
    const result = await user.save();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
};



const userRoutes = express.Router();

userRoutes.route("/").post(bodyParser.json(), addUser);
module.exports = {userRoutes, confirmUser, confirmUserExists};
