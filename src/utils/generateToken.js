import  jwt  from 'jsonwebtoken';
require("dotenv").config();
const {
  assignProjectRole,
  Project,
  User,
  Organization,
  Role,
} = require(".././models");

export function generateToken(user) {
  return new Promise((resolve, reject) => {
    Role.findOne({ name: user.Role })
      .then(role => {
        const data = {
          id: user.id || user._id,
          name: `${user.FirstName} ${user.LastName}`,
          email: user.Email,
          organization: user.Organization,
          role: role.name // add role object to data object
        };
        const expiresIn = process.env.JWT_EXPIRATION_IN;
        const secret = process.env.JWT_SECRET;
        resolve(jwt.sign(data, secret, { expiresIn }));
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
