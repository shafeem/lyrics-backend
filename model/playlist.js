const mongoose = require("mongoose")

const playlistShema = new mongoose.Schema({
    image:{
        type:String
    },
    name:{
        type:String
    },
    song:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }]
})

const Playlist = mongoose.model("Playlist",playlistShema);

module.exports = Playlist;