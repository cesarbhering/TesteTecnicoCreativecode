"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_1 = require("./models/queries");
const validateUserSchema_1 = require("./middlewares/validateUserSchema");
const route = (0, express_1.Router)();
route.get("/", (_req, res) => {
    // Rota para listar todos os usuários cadastrados
    const allUsers = (0, queries_1.getUsers)().then((users) => {
        res.json(users.rows);
    });
});
route.get("/:id", (req, res) => {
    // Rota para listar um usuário específico baseado em seu id
    const user = (0, queries_1.getUserById)(req.params.id).then((user) => {
        res.json(user.rows);
    });
});
route.post("/", validateUserSchema_1.validateUserSchema, (req, res) => {
    // Rota para cadastrar um novo usuário
    const { name, email } = req.body;
    const newUser = (0, queries_1.createUser)(name, email).then((user) => {
        res.json(user.rows);
    });
});
exports.default = route;
