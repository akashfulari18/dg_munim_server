// const faker = require('f');
const bcrypt = require('bcryptjs')

const generatePassword = async (username) => {
    const password = `${username}\#123`
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return { plainPassword: password, hashedPassword };
  };

  module.exports={generatePassword}