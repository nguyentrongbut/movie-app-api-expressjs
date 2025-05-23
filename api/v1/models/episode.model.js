const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const episodeSchema = new mongoose.Schema({
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    video_url: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Episode = mongoose.model('Episode', episodeSchema, "episodes");

module.exports = Episode;