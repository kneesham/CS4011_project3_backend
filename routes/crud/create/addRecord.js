const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser")
const userRecords = require("../../../models/record");

const addRecord = async (req, res) => {
    try {
      const record = new userRecords(req.body)
      const result = await record.save();  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.send(error);
    }
  };
  
const addRecordRoute = express.Router();

addRecordRoute.route("/").post(bodyParser.json(), addRecord);
module.exports = addRecordRoute;
