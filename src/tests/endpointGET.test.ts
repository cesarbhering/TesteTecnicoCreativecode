import app from "../app";
import request from "supertest";
import { pool } from "../models/queries";

describe("Testando o endpoint GET '/' e GET '/:id'", () => {
  beforeAll(async () => {
    await pool.query("CREATE DATABASE creativecode2;");
    await pool.query("USE creativecode2;");
    await pool.query(`
      CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );
    `);
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
  });

  afterAll(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY;");
    return pool.end();
  });

  it("Retorna 200 e a mensagem 'Nenhum usuário cadastrado' quando não há usuários cadastrados", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Nenhum usuário cadastrado");
      });
  });

  it("Retorna 200 e as informações do usuário quando há um usuário cadastrado", async () => {
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
            id: 1,
            name: "Fulano",
            email: "fulano@hotmail.com",
          },
        ]);
      });
  });

  it("Retorna 200 e as informações dos usuários quando há mais de um usuário cadastrado", async () => {
    await request(app).post("/").send({
      name: "Beltrano",
      email: "beltrano@bol.com.br",
    });
    return request(app)
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
  });

  it("Retorna 200 as informações do usuário solicitado em /:id", async () => {
    return request(app)
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
  });

  it("Retorna 404 quando o usuário solicitado e, '/:id' não existe", async () => {
    return request(app).get("/3").expect(404);
  });
});
