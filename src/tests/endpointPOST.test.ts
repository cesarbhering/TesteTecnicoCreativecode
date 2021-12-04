import app from "../app";
import request from "supertest";
import { pool } from "../models/queries";

describe("Testando o endpoint POST '/'", () => {
  beforeAll( () => {
    return pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
  });

  afterAll(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    return pool.end();
  });

  it("Retorna 201 e os dados do usuário ao realizar o cadastro", async () => {
    await request(app)
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
  });

  it("Retorna 400 e a mensagem de email inválido ao informar email inválido", async () => {
    await request(app)
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
  });

  it("Retorna 400 e a mensagem de nome não preenchido ao não informar nome", async () => {
    await request(app)
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
  });
});