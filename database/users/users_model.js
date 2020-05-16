const bcrypt = require("bcryptjs");
const db = require("../dbConfig");

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14);
    const [id] = await db("users").insert(user);
    return findById(id);
}

function find() {
    return db("users").select("id", "username", "password");
}

function findBy(filter) {
    return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
    return db("users").where({ id }).select("id", "username").first();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
};
