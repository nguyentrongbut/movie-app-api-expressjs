

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
    const videoLink = req.body.video_url;

    try {
        res.status(201).send({
            message: 'Create new movie success!',
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
}