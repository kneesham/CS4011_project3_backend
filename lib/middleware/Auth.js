const jsonwebtoken = require('jsonwebtoken');
const {confirmUserExists} = require('../../routes/users/userRoutes');

const tokenSignature = 'This-is-a-$ign@ture';

const tokenAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  const [type, token] = header.split(' ');

  if (type === 'Bearer') {
    try {
      const payload = jsonwebtoken.verify(token, tokenSignature);
      console.log("payload: ", payload)
      const doesUserExist = await confirmUserExists(payload.username);
      // const userProfileInformation = await getProfileContents(payload.username);
      // need to define this here
      console.log("doesUserexist? ", doesUserExist)
      if (doesUserExist) {
        // res.send(userProfileInformation);
        next();
      } else {
        res.send(401);
      }
    } catch (error) {
      res.send(error.message);
    }
  }
};

module.exports = tokenAuth;
