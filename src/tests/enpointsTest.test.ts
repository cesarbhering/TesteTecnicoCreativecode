import app from "../app";
import request from "supertest";
import {pool} from "../models/queries"

describe("Testando o endpoint GET '/'", () => {
  beforeEach(() => {
    return pool.query("START TRANSACTION");
  });
  afterEach(() => {
    return pool.query("ROLLBACK");
  });

  it("Retorna 'Nenhum usuário cadastrado' quando não há usuários cadastrados", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Nenhum usuário cadastrado");
      });
  });

  it("Retorna as informações do usuário quando há um usuário cadastrado", async () => {
    await request(app).post("/").send({
      name: "Fulano",
      email: "fulano@hotmail.com",
    });
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([
          {
            name: "Fulano",
            email: "fulano@hotmail.com",
          },
        ]);
      });
  });
});
