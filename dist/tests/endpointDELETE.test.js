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
describe("Testando o endpoint DELETE '/:id'", () => {
    beforeAll(() => {
        return queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield queries_1.pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
        return queries_1.pool.end();
    }));
    it("Retorna 404 e a mensagem 'Usuário não encontrado' quando o usuário não é encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .delete("/1")
            .expect(404)
            .then((response) => {
            expect(response.text).toBe("Usuário não encontrado");
        });
    }));
    it("Retorna 204 quando o usuário é deletado", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/").send({
            name: "Fulano",
            email: "fulano@hotmail.com",
        });
        return (0, supertest_1.default)(app_1.default).delete("/1").expect(204);
    }));
});
