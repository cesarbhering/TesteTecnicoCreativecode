"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("./models/queries");
const validateUserSchema_1 = require("./middlewares/validateUserSchema");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    // Rota para listar todos os usuários cadastrados
    (0, queries_1.getUsers)().then((users) => {
        if (users.rows.length === 0) {
            res.status(200).send("Nenhum usuário cadastrado");
        }
        else {
            return res.status(200).json(users.rows);
        }
    });
});
app.get("/:id", (req, res) => {
    // Rota para listar um usuário pelo id
    const { id } = req.params;
    (0, queries_1.getUserById)(id).then((user) => {
        if (user.rows.length === 0) {
            res.status(404).send("Usuário não encontrado");
        }
        else {
            return res.status(200).json(user.rows);
        }
    });
});
app.post("/", validateUserSchema_1.validateUserSchema, (req, res) => {
    // Rota para cadastrar um novo usuário
    const { name, email } = req.body;
    const newUser = (0, queries_1.createUser)(name, email).then((user) => {
        res.status(201).json(user.rows);
    });
});
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Rota para deletar um usuário específico baseado em seu id
    const user = yield (0, queries_1.getUserById)(req.params.id).then((user) => {
        if (user.rows.length === 0) {
            return res.status(404).send("Usuário não encontrado");
        }
        else {
            return (0, queries_1.deleteUser)(req.params.id).then((user) => {
                return res.status(204).send();
            });
        }
    });
}));
exports.default = app;
