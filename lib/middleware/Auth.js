const jsonwebtoken = require('jsonwebtoken');
const {confirmUserExists} = require('../../routes/users/userRoutes');

const tokenSignature = process.env.API_KEY;
const tokenAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  const [type, token] = header.split(' ');

  if (type === 'Bearer') {
    try {
      const payload = jsonwebtoken.verify(token, tokenSignature);
      const doesUserExist = await confirmUserExists(payload.username);
      
      if (doesUserExist) {
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
