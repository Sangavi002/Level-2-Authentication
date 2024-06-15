const jwt = require("jsonwebtoken");
const BlacklistedTokenModel = require("../model/blacklisted.model");

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        const isBlacklisted = await BlacklistedTokenModel.exists({ token });
        if (isBlacklisted) {
            return res.send("You are blacklisted, Please login again.");
        }
        jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                res.send("Please login first.");
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = auth;
