const User = require("../../models/user.model")
const RefreshToken = require("../../models/refreshToken.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateHelpers = require("../../../../helpers/generate")


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({
            email: req.body.email
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
            await new RefreshToken({ token: refreshToken, userId: user.id }).save();

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
                    email: user.email,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        // create user
        const newUser = await new User({
            email: req.body.email,
            password: hashed
        })

        // save user
        const user = await newUser.save();

        res.status(200).json({
            message: 'Create user successfully',
            data: {
                email: user.email,
                password: user.password
            }
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

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
        return res.status(403).json({ message: 'Invalid refresh token' })
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
        await new RefreshToken({ token: newRefreshToken, userId: user.id }).save();

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

module.exports.logout = async (req, res) => {
    // delete refresh token in DB
    await RefreshToken.deleteOne({ token: req.cookies.refreshToken });
    res.clearCookie('refreshToken');
    res.status(200).json({
        message: 'Logout successfully'
    })
}