const { ImgurClient } = require("imgur");

module.exports.uploadToImgur = async (req, res, next) => {
    try {
        if (req.file) {
            // Khởi tạo client theo cách mới
            const client = new ImgurClient({
                clientId: process.env.IMGUR_CLIENT_ID
            });

            // Convert file buffer to base64
            const base64 = req.file.buffer.toString("base64");

            // Upload using new API
            const response = await client.upload({
                image: base64,
                type: 'base64'
            });

            // Lấy link (cấu trúc mới của response)
            req.avatarUrl = response.data.link;
            req.body.avatar_url = req.avatarUrl;
        }
        next();
    } catch (err) {
        console.error("Upload Imgur error:", err);
        return res.status(500).json({ message: "Lỗi upload ảnh lên Imgur" });
    }
};