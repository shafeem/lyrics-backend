const userSchema = require("../model/user");
const Role = require("../model/role");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userlogin = async (req, res) => {
  try {
    let userId;
    let userType;

    const { name, email } = req.body.datas.data;

    const user = await userSchema.findOne({ email: email });

    if (user) {
      console.log("user already exist");

      userId = user._id;
      userType = user.type;
    } else {
      console.log("user not exist ");
      const newUser = new userSchema({
        name: name,
        email: email,
      });
      await newUser.save();

      const user = await userSchema.findOne({ email: email });
      userId = user._id;
      userType = user.type;
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECREAT_KEY, {
      expiresIn: 86400,
    });

    res.json({
      auth: true,
      token: token,
      name: name,
      email: email,
      userId: userId,
      userType: userType,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyNumber = async (req, res) => {
  console.log(req.body);
  const { number } = req.body;

  const user = await userSchema.findOne({ number: number });
  let userId;
  let userType;

  if (user) {
    console.log("existing user here");
    userId = user._id;
    userType = user.type;
  } else {
    console.log("user not existing here");
    const newUser = new userSchema({
      number: number,
    });
    await newUser.save();

    const user = await userSchema.findOne({ number: number });

    userId = user._id;
    userType = user.type;
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECREAT_KEY, {
    expiresIn: 86400,
  });

  res.json({
    auth: true,
    token: token,
    status: "success",
    userType: userType,
    userId: userId,
  });
};

const roleChanger = async (req, res) => {
  const { id } = req.body;
  console.log(id, "this is the id here");

  await userSchema
    .updateOne({ _id: id }, { $set: { type: Role.artist } })
    .then(() => {
      console.log("role changed successfully ");
      res.json({
        userType: Role.artist,
      });
    });
};

module.exports = {
  userlogin,
  verifyNumber,
  roleChanger,
};
