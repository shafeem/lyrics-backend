const jwt = require("jsonwebtoken");
const userSchema = require("../model/user");
const songSchema = require("../model/song");
const playlistShema = require("../model/playlist");

const adminLogin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pw = process.env.ADMIN_PASSWRD;

    console.log(req.body, "this is the datas");
    const { Email, password } = req.query;
    console.log(Email, password, "datas");

    if (Email !== undefined && password !== undefined) {
      if (Email == email) {
        console.log("email are equal");
        if (pw == password) {
          console.log("password are equal");

          const admin = {
            email: Email,
          };

          const token = jwt.sign({ admin }, process.env.JWT_SECREAT_KEY, {
            expiresIn: 86400,
          });

          res.json({ message: "Login SuccessFull", token: token });
        } else {
          res.json({ message: "Password Error" });
        }
      } else {
        res.json({ message: "Email Error" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userFinder = async (req, res) => {
  const details = await userSchema.find();

  res.json({ data: details });
};

const artistApprover = async (req, res) => {
  console.log("its working");
  const id = req.body.data[0]._id;

  await userSchema.updateOne({ _id: id }, { $set: { type: "artist" } });
};

const songFinder = async (req, res) => {
  const songs = await songSchema.find();

  res.json({ tracks: songs });
};

const findArtist = async (req, res) => {
  const artistDetails = await userSchema.find({ type: "artist" });

  res.json({ artistDetails: artistDetails });
};

const findingUsers = async (req, res) => {
  const userDetails = await userSchema.find({ type: "user" });

  res.json({ user: userDetails });
};

module.exports = {
  adminLogin,
  userFinder,
  artistApprover,
  songFinder,
  findArtist,
  findingUsers,
};
