  const express = require("express");
require("dotenv").config();
const logger = require("./lib/middleware/logger");
const cors = require('cors');
const tokenAuth = require("./lib/middleware/Auth");
const { userRoutes } = require("./routes/users/userRoutes");
const { userHomeRouter } = require("./routes/users/userHomeRoute");
const {allResultsRouter} = require("./routes/crud/read/getAllResults");
const {allRecordsRouter} = require("./routes/crud/read/getUsersRecords")
const addRecordRoute = require("./routes/crud/create/addRecord");
const tokenRouter = require("./routes/users/getUserToken");
const updateRecordRouter = require("./routes/crud/update/updateRecord");
const deleteRecordRouter = require("./routes/crud/delete/deleteRecord");

const mongoose = require("mongoose")
const mongoURL = process.env.MONGO_URL;
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
app.use("/myRecords", allRecordsRouter);

app.listen(port);
console.log("Now listening on port " + port);