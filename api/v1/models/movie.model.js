const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    categories: {
        type: Array,
        default: [],
    },
    description: String,
    thumbnail_url: String,
    poster_url: String,
    video_url: String,
    status: String,
    slug: String,
    year: String,
    deleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema, "movies");

module.exports = Movie;