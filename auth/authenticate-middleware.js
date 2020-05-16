const jwt = require("jsonwebtoken");

function restrict(role = "normal") {
    return async (req, res, next) => {
        const authError = {
            you: "shall not pass",
        };
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json(authError);
            }

            jwt.verify(token, "secret and safe", (err, decodedPayload) => {
                if (err || decodedPayload.userRole !== role) {
                    return res.status(401).json(authError);
                }
                req.token = decodedPayload;
                next();
            });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = restrict;
