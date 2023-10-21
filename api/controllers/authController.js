const jwt = require('jwt-simple');
const User = require('../models/user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode(
        {
            sub: user._id,
            iat: timestamp
        },
        process.env.JWT_SECRET
    );
};

exports.login = (req, res, next) => {
    const user = req.user;
    res.send({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(422)
            .json({ message: 'Please provide your email and password' });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(422)
                .json({ message: 'Email Already Registered' });
        } else {
            const newUser = await User.create({ email, password });
            res.status(201).json({
                user_id: newUser._id,
                token: tokenForUser(newUser)
            });
        }
    } catch (error) {
        if (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
