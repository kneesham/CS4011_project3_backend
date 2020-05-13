  
const express = require("express");
const logger = require("./lib/middleware/logger");
var cors = require('cors');
const tokenAuth = require("./lib/middleware/Auth");
const { userRoutes } = require("./routes/users/userRoutes");
const tokenRouter = require("./routes/users/getUserToken");
const { userHomeRouter } = require("./routes/users/userHomeRoute");
const addRecordRoute = require("./routes/crud/create/addRecord");
const updateRecordRouter = require("./routes/crud/update/updateRecord");
const deleteRecordRouter = require("./routes/crud/delete/deleteRecord");
const {allResultsRouter} = require("./routes/crud/read/getAllResults");


const mongoose = require("mongoose")
const mongoURL = "mongodb://127.0.0.1:27017/celesteDB";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const dbConnection = mongoose.connection
dbConnection.on('error', err => console.error(err))
dbConnection.once('open', () => console.log("Connected to db"))

const port = 5000;
const app = express();

app.use(cors());
// I tried using http and https but I could not get rid of that dang 'cors' error!
// anyway adding this fixed my issue.

app.use(logger);
app.use("/addRecord", addRecordRoute);
app.use("/deleteRecord", deleteRecordRouter);
app.use("/updateRecord", updateRecordRouter);
// for the crud operations!

app.use("/createAccount", userRoutes);
app.use("/getToken", tokenRouter);
app.use(tokenAuth);
app.use("/home", userHomeRouter);
app.use("/allResults", allResultsRouter);
// app.use("/myRecords", myRecordRouter);
// after authenticating now you can show the user their account information and stuff!
app.listen(port);
console.log("Now listening on port " + port);