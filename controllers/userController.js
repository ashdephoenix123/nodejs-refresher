const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//@desc register user
//@route /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ id: user._id, email: user.email });
});

//@desc login user
//@route /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc current user info
//@route /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
