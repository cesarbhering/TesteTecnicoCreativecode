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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const queries_1 = require("../models/queries");
describe("Testando o endpoint POST '/'", () => {
    beforeAll(() => {
        return queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
        return queries_1.pool.end();
    }));
    it("Retorna 201 e os dados do usuário ao realizar o cadastro", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/")
            .send({
            name: "Teste",
            email: "teste@teste.com",
        })
            .expect(201)
            .then((response) => {
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: "Teste",
                    email: "teste@teste.com",
                },
            ]);
        });
    }));
    it("Retorna 400 e a mensagem de email inválido ao informar email inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/")
            .send({
            name: "Teste",
            email: "teste.com",
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                message: '"email" must be a valid email',
            });
        });
    }));
    it("Retorna 400 e a mensagem de nome não preenchido ao não informar nome", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/")
            .send({
            email: "teste@teste.com",
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                message: '"name" is required',
            });
        });
    }));
});
