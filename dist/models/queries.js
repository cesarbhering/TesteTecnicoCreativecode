"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
require("dotenv/config");
const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
function getUsers() {
    try {
        return pool.query("SELECT * FROM users");
    }
    catch (error) {
        console.log(error);
    }
}
exports.getUsers = getUsers;
function getUserById(id) {
    try {
        return pool.query("SELECT * FROM users WHERE id = $1", [id]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.getUserById = getUserById;
function createUser(name, email) {
    try {
        return pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email", [name, email]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createUser = createUser;
