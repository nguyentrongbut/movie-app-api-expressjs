const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    movie_id: String,
    video_url: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Episode = mongoose.model('Episode', episodeSchema, "episodes");

module.exports = Episode;