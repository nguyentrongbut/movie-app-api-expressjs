const { ImgurClient } = require("imgur");

module.exports.uploadMultipleFilesToImgur = (fieldMapping) => {
    return async (req, res, next) => {
        try {
            const client = new ImgurClient({
                clientId: process.env.IMGUR_CLIENT_ID
            });

            // fieldMapping = { logo: 'logo_url', favicon: 'favicon_url' }
            for (const fieldName in fieldMapping) {
                const targetField = fieldMapping[fieldName];

                const file = req.files?.[fieldName]?.[0];
                if (file) {
                    const base64 = file.buffer.toString("base64");
                    const response = await client.upload({
                        image: base64,
                        type: 'base64'
                    });

                    const uploadedUrl = response.data.link;

                    req[targetField] = uploadedUrl;
                    if (req.body) {
                        req.body[targetField] = uploadedUrl;
                    }
                }
            }

            next();
        } catch (err) {
            console.error("Upload multiple Imgur error:", err);
            return res.status(500).json({ message: "Lỗi upload nhiều ảnh lên Imgur" });
        }
    };
};