const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
    image:{
        type:String
    },
    name:{
        type:String
    },
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song",
        unique: true,
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Playlist = mongoose.model("Playlist",playlistSchema);

module.exports = Playlist;