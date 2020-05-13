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
        console.log("the record to update is: ", recordToUpdate.record);
        console.log("the object in which to updat it with is: ", req.body);
        //   const record = new userRecords(req.body)
        //   const result = await record.save();
        //   const hashedPassword = await bcrypt.hash(password, 10);
        console.log("record id is : ", recordId);

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


// const editPost = async (req, res) => {
//     // updates a specific post



//     try {
//         mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true} );
//         const post_Id = await UserPost.find({id: postId});
//         // used to get the long _id
//         console.log(post_Id[0]._id);

//         const postsToEdit = await UserPost.findById(post_Id[0]._id).exec();
//         postsToEdit.set(req.body);
//         const result = await postsToEdit.save();
//         res.send( result );
//         mongoose.disconnect(mongoUrl);
//     }
//     catch (error) {
//         console.error("error: ", error);
//         res.status(500);
//         res.send(error);
//     } 
// }
