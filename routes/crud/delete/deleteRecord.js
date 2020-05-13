const express = require("express");
const bodyParser = require("../../../lib/middleware/bodyParser")
const userRecords = require("../../../models/record");


const deleteRecord = async (req, res) => {
    try {
        const recordId = req.params.recordId;
        const recordToUpdate = await userRecords.deleteOne({ _id: recordId }).exec();
        console.log("the record to update is: ", recordToUpdate.record);
        console.log("the object in which to updat it with is: ", req.body);
        console.log("record id is : ", recordId);

        res.send("deleted record: " + recordToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500);
        res.send(error);
    }
};


const deleteRecordRouter = express.Router();

deleteRecordRouter.route("/byid/:recordId").delete(bodyParser.json(), deleteRecord);
module.exports = deleteRecordRouter;
