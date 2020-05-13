const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const { confirmUser } = require("./userRoutes");
const jsonWebToken = require("jsonwebtoken");

const tokenSignature = "This-is-a-$ign@ture";

const createToken = (userId) => {
    
  return jsonWebToken.sign(
    {
      userId,
    },
    tokenSignature,
    { expiresIn: "50m" }
  );
};

const createTokenRoute = async (req, res) => {
  const { username, password } = req.body;
  console.log("req body: ", req.body);

  const userExists = await confirmUser(username, password);

  console.log("user exists????", userExists);

  if (userExists) {
    const token = createToken(username);

    console.log("token?", token);
    res.status(201);
    res.send(token);
  } else {
      console.log("we hit here password is: ", password);
    res.sendStatus(422);
    // we need to figure out why exactly we are getting a 422
    // then we can fix it!
  }
};

const tokenRouter = express.Router();

tokenRouter.post("/", bodyParser.json(), createTokenRoute);

module.exports = tokenRouter;
