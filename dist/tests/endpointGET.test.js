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
describe("Testando o endpoint GET '/' e GET '/:id'", () => {
    beforeAll(() => {
        return queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
        return queries_1.pool.end();
    }));
    it("Retorna 200 e a mensagem 'Nenhum usuário cadastrado' quando não há usuários cadastrados", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/")
            .expect(200)
            .then((response) => {
            expect(response.text).toBe("Nenhum usuário cadastrado");
        });
    });
    it("Retorna 200 e as informações do usuário quando há um usuário cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/").send({
            name: "Fulano",
            email: "fulano@hotmail.com",
        });
        return (0, supertest_1.default)(app_1.default)
            .get("/")
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: "Fulano",
                    email: "fulano@hotmail.com",
                },
            ]);
        });
    }));
    it("Retorna 200 e as informações dos usuários quando há mais de um usuário cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/").send({
            name: "Beltrano",
            email: "beltrano@bol.com.br",
        });
        return (0, supertest_1.default)(app_1.default)
            .get("/")
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: "Fulano",
                    email: "fulano@hotmail.com",
                },
                {
                    id: 2,
                    name: "Beltrano",
                    email: "beltrano@bol.com.br",
                },
            ]);
        });
    }));
    it("Retorna 200 as informações do usuário solicitado em /:id", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .get("/2")
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual([
                {
                    id: 2,
                    name: "Beltrano",
                    email: "beltrano@bol.com.br",
                },
            ]);
        });
    }));
    it("Retorna 404 quando o usuário solicitado e, '/:id' não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default).get("/3").expect(404);
    }));
});
