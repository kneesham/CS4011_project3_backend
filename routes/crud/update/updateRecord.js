const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser")
const userRecords = require("../../../models/record");

const updateRecord = async (req, res) => {
    try {
        //   console.log(req.body);
        const recordId = req.params.recordId;
        const recordToUpdate = await userRecords.findOne({ _id: recordId }).exec();
        recordToUpdate.record.set(req.body);
        recordToUpdate.save();
        res.send(recordToUpdate.record);
    } catch (error) {
        console.error(error);
        res.status(500);
        res.send(error);
    }
};


const updateRecordRouter = express.Router();

updateRecordRouter.route("/byid/:recordId").patch(bodyParser.json(), updateRecord);
module.exports = updateRecordRouter;
