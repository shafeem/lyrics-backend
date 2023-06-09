const jwt = require("jsonwebtoken");
const userSchema = require("../model/user");
const songSchema = require("../model/song");
const playlistShema = require("../model/playlist");

const adminLogin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pw = process.env.ADMIN_PASSWRD;

    const { Email, password } = req.body;
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
  const user = await userSchema.find({ type: "user" });
  console.log(user, "the user data");
  const artist = await userSchema.find({ type: "artist" });
  const pending = await userSchema.find({ type: "pending" });

  console.log(user, artist, pending, "all the data of the user here");

  res.json({ user, artist, pending });
};

const artistApprover = async (req, res) => {
  console.log("its working", req.body);
  const { id } = req.body;

  await userSchema.updateOne({ _id: id }, { $set: { type: "artist" } });

  const data = await userSchema.find();
  res.json({ data: data });
};

const songFinder = async (req, res) => {
  const songs = await songSchema.find({ status: "success" });
  const pending = await songSchema.find({ status: "pending" });

  res.json({ tracks: songs, pending: pending });
};

const findArtist = async (req, res) => {
  const artistDetails = await userSchema.find({ type: "artist" });

  res.json({ artistDetails: artistDetails });
};

const findingUsers = async (req, res) => {
  const userDetails = await userSchema.find({ type: "user" });
  console.log(userDetails, "the userDetails");

  res.json({ user: userDetails });
};

const songRefuser = async (req, res) => {
  const { id } = req.body;
  console.log("the song refuser", id);

  const song = await songSchema.updateOne({_id:id},{
    $set: {
      status:"failed",
    }
  })
  console.log('song refused' );
  res.json({song:song})
};

const songApprover = async (req, res) => {
  const { id } = req.body;
  console.log("the song approver", id);

  const song = await songSchema.updateOne({_id:id},{
    $set:{
      status: 'success'
    }
  })
  console.log('song approved Successfully');
  res.json({song:song})
};

module.exports = {
  adminLogin,
  userFinder,
  artistApprover,
  songFinder,
  findArtist,
  findingUsers,
  songRefuser,
  songApprover,
};
