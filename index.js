const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./database/users/users_router");
const jokesRouter = require("./jokes/jokes-router");
const restrict = require("./auth/authenticate-middleware");

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser());

server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/jokes", restrict("admin"), jokesRouter);

server.get("/", (req, res, next) => {
    res.json({
        message: "Hiya!",
    });
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Whoops, something went wrong",
    });
});

if (!module.parent) {
    //important to wrap server in an if if using testing
    server.listen(PORT, () => {
        console.log(`Running at http://localhost:${PORT}`);
    });
}
module.exports = server;
