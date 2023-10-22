const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');

const localOptions = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOptions, async function (
    email,
    password,
    done
) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false);
        user.comparePassword(password, function (error, isMatch) {
            if (error) return done(error);
            if (!isMatch) return done(null, false);
            return done(null, user);
        });
    } catch (error) {
        if (error) return done(error);
    }
});

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const JwtStrategy = new Strategy(jwtOptions, async function (payload, done) {
    try {
        const user = await User.findById(payload.sub);
        user ? done(null, user) : done(null, false);
    } catch (error) {
        if (error) return done(error, false);
    }
});

passport.use(localStrategy);
passport.use(JwtStrategy);
