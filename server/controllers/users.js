import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models';

const { users } = db;

const formatUserData = (userData) => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  };
};

const generateToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '48hr' });
}

const verifyPassword = (textPassword, hashedPassword) => {
  return bcrypt.compareSync(textPassword, hashedPassword);
}

const getUser = async (userModel, userEmail) => {
  const user = await userModel.findOne({
    where: {
      email: userEmail.toLowerCase()
    }
  });
  return user;
}

export default {
  async signup(req, res) {
    const {
      name, email, password,
      } = res.locals.formattedInputs;
    const user = await getUser(users, email);
    if (user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User already exist',
      });
    } else {
      const newUser = await users.create({
        name,
        email: email.toLowerCase(),
        password,
      });
      return res.status(201).json({
        status: 'success',
        message: 'user created',
        user: formatUserData(newUser),
        token: generateToken({ id: newUser.id, role: newUser.role, }),
      });
    }
  },

  async signin(req, res) {
    const { email, password, } = res.locals.formattedInputs;
    const user = await getUser(users, email, );
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    } else if (verifyPassword(password, user.password)) {
      return res.status(200).json({
        status: 'success',
        message: 'Logged in',
        user: formatUserData(user),
        token: generateToken({ id: user.id, role: user.role, }),
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'password incorrect',
      });
    }
  },

  async createAdmin(req, res) {
    const { email } = res.locals.formattedInputs;
    const user = await getUser(users, email);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    } else if (user.role === 'admin' || user.role === 'superAdmin') {
      return res.status(200).json({
        status: 'failed',
        message: 'the user is already an admin',
      });
    } else {
      await user.update({ role: 'admin' });
      return res.status(200).json({
        status: 'success',
        message: 'the user has been updated to become an admin',
      });
    }
  }
};
