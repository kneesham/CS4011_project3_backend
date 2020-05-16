const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("../../lib/middleware/bodyParser");
const userPassword = require("../../models/user")
const bcrypt = require("bcrypt");

const confirmUserExists = async (username) => {
  try {
    const results = await userPassword.findOne({
      username,
    })
    if (results && results.username === username) {
      return true;
    }

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

    if (results && (await bcrypt.compare(password, results.password))) {
      return true;
    }
    else {
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
module.exports = { userRoutes, confirmUser, confirmUserExists };
