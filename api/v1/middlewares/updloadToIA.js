const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.IA_ACCESS_KEY,
    secretAccessKey: process.env.IA_SECRET_KEY,
    endpoint: 'https://s3.us.archive.org',
    region: 'us-east-1',
    signatureVersion: 'v2',
    s3ForcePathStyle: true,
});

const uploadToIA = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const bucket = 'fztruyen';
    const key = req.file.originalname;

    const params = {
        Bucket: bucket,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
        Metadata: {
            'x-archive-meta-title': 'My Upload Title',
            'x-archive-meta-mediatype': 'movies',
            'x-archive-meta-collection': 'opensource_movies',
        },
    };

    try {
        await s3.putObject(params).promise();
        req.body.video_url = `https://archive.org/download/${bucket}/${key}`;
        next();
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload to IA failed', detail: err.message });
    }
};

module.exports = uploadToIA;
