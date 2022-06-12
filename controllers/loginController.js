// import dependencies
import jwt from 'jsonwebtoken';

// Models
import User from '../models/user.js';

export async function login(req, res, next) {
  // get user from DB
  const user = await User.findOne({ username: req.body.username });

  // if user = null return message
  if (!user) return res.json({ message: 'Incorrect username/password' });

  // if check if password matches found user in DB password
  const validPassword = await user.isValidPassword(req.body.password);

  // if valid = false return message
  if (!validPassword)
    return res.json({ message: 'Incorrect username/password' });

  // if above validation pass sign and return token
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token,
    });
  });
}
