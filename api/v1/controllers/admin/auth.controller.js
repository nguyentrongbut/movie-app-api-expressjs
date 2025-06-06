const Admin = require("../../models/admin.model")
const Role = require("../../models/role.model")
const RefreshToken = require("../../models/refreshToken.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateHelpers = require("../../../../helpers/generate")

// [POST] /api/v1/admin/login
module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await Admin.findOne({
            email: req.body.email,
            status: "active",
            deleted: false
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        if (user && validPassword) {
            const accessToken = generateHelpers.generateAccessToken(user)
            const refreshToken = generateHelpers.generateRefreshToken(user)

            // Save refresh token in DB
            await new RefreshToken({token: refreshToken, userId: user.id}).save();

            // update time login
            user.last_login = new Date();
            await user.save();

            // Send refresh token in cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // secure: true, when deploy set true
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({
                message: 'Login successfully',
                data: {
                    accessToken: accessToken,
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [POST] /api/v1/admin/refresh-token
module.exports.refreshToken = async (req, res) => {
    // take refresh token from user
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: 'You are not authenticated'
        })
    }

    // check if refresh token is in the database
    const tokenInDb = await RefreshToken.findOne({
        token: refreshToken
    });
    if (!tokenInDb) {
        return res.status(403).json({message: 'Invalid refresh token'})
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Refresh token is not valid',
                err: err
            })
        }

        // Remove old token from DB
        await RefreshToken.deleteOne({
            token: refreshToken
        });

        // create new access token and refresh token
        const newAccessToken = generateHelpers.generateAccessToken(user)
        const newRefreshToken = generateHelpers.generateRefreshToken(user)

        // Save new refresh token in DB
        await new RefreshToken({token: newRefreshToken, userId: user.id}).save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            // secure: true, when deploy set true
            secure: false,
            path: "/",
            sameSite: "strict"
        })
        res.status(200).json({
            accessToken: newAccessToken
        })
    })
}

// [POST] /api/v1/admin/logout
module.exports.logout = async (req, res) => {
    // delete refresh token in DB
    await RefreshToken.deleteOne({token: req.cookies.refreshToken});
    res.clearCookie('refreshToken');
    res.status(200).json({
        message: 'Logout successfully'
    })
}

// [GET] /api/v1/admin/profile
module.exports.profile = async (req, res) => {
    const id = req.user.id;
    let find = {
        deleted: false,
        _id: id
    }
    try {
        const user = await Admin.findOne(find).select("-password -deleted")

        if (user?.role_id) {
            const role = await Role.findOne({_id: user?.role_id, deleted: false}).select("-deleted")

            const result = {
                ...user.toObject(),
                role: role.title,
                permissions: role.permissions
            };
            return res.status(200).json({
                message: 'Get profile successfully',
                user: result,
            })
        }
        res.status(200).json({
            message: 'Get profile successfully',
            user: user,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// [PATCH] /api/v1/admin/profile
module.exports.edit = async (req, res) => {
    const id = req.user.id;
    try {
        // Nếu có req.avatarUrl, đảm bảo nó được thêm vào req.body
        if (req.avatarUrl && !req.body.avatar_url) {
            req.body.avatar_url = req.avatarUrl;
        }

        await Admin.updateOne({_id: id}, {
            ...req.body
        });

        res.status(200).json({
            message: "Updated profile successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}