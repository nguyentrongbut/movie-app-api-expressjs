const Movie = require('../../models/movie.model')
const Episode = require('../../models/episode.model')
const {convertSlug} = require("../../../../helpers/convert.slug.helper");

// [GET] api/v1/admin/movie
module.exports.index = async (req, res) => {

    try {
        res.status(200).send({
            message: 'Get list movie success',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}

// [POST] api/v1/admin/movie/create
module.exports.create = async (req, res) => {
    let {
        title, slug, ...rest
    } = req.body;

    slug = convertSlug(slug, title)

    try {
        const movie = new Movie({
            title, slug, ...rest
        })

        await movie.save()
        res.status(201).send({
            message: 'Create new movie success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}