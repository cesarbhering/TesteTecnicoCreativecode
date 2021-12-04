import app from "../app";
import request from "supertest";
import { pool } from "../models/queries";

describe("Testando o endpoint DELETE '/:id'", () => {
  beforeAll(() => {
    return pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
  });

  afterAll(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    return pool.end();
  });

  it("Retorna 404 e a mensagem 'Usuário não encontrado' quando o usuário não é encontrado", async () => {
    return request(app)
      .delete("/1")
      .expect(404)
      .then((response) => {
        expect(response.text).toBe("Usuário não encontrado");
      });
  });

  it("Retorna 204 quando o usuário é deletado", async () => {
    await request(app).post("/").send({
      name: "Fulano",
      email: "fulano@hotmail.com",
    });
    return request(app).delete("/1").expect(204);
  });
});
