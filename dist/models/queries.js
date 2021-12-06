"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUserById = exports.getUsers = exports.pool = void 0;
require("dotenv/config");
const Pool = require("pg").Pool;
exports.pool = new Pool({
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    host: "postgres",
    password: process.env.APP_DB_PASS,
});
function getUsers() {
    // Query para pegar todos os usuários da tabela users
    try {
        return exports.pool.query("SELECT * FROM users", []);
    }
    catch (error) {
        console.log(error);
    }
}
exports.getUsers = getUsers;
function getUserById(id) {
    // Query para pegar um usuário específico da tabela users
    try {
        return exports.pool.query("SELECT * FROM users WHERE id = ($1)", [id]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.getUserById = getUserById;
function createUser(name, email) {
    // Query para criar um usuário na tabela users
    try {
        return exports.pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email", [name, email]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createUser = createUser;
function deleteUser(id) {
    // Query para deletar um usuário da tabela users
    try {
        return exports.pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email", [id]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteUser = deleteUser;
