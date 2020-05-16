const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const { confirmUser } = require("./userRoutes");
const jsonWebToken = require("jsonwebtoken");

const tokenSignature = process.env.API_KEY;

const createToken = (userId) => {
    
  return jsonWebToken.sign(
    {
      userId,
    },
    tokenSignature,
    { expiresIn: "120m" }
  );
};

const createTokenRoute = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await confirmUser(username, password);

  if (userExists) {
    const token = createToken(username);
    res.status(201);
    res.send(token);
  } else {
      console.log("we hit here password is: ", password);
    res.sendStatus(422);
  }
};

const tokenRouter = express.Router();

tokenRouter.post("/", bodyParser.json(), createTokenRoute);

module.exports = tokenRouter;
