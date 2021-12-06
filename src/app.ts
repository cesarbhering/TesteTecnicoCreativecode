import { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} from "./models/queries";
import { validateUserSchema } from "./middlewares/validateUserSchema";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  // Rota para listar todos os usuários cadastrados
  getUsers().then((users) => {
    if (users.rows.length === 0) {
      res.status(200).send("Nenhum usuário cadastrado");
    } else {
      return res.status(200).json(users.rows);
    }
  });
});

app.get("/:id", (req: Request, res: Response) => {
  // Rota para listar um usuário pelo id
  const { id } = req.params;
  if (id !== 'favicon.ico') {
    getUserById(Number(id)).then((user) => {
      if (user.rows.length === 0) {
        res.status(200).send("Usuário não encontrado");
      } else {
        return res.status(200).json(user.rows);
      }
    });
  } else {
    res.status(400).send("Id inválido");
  }
});

app.post("/", validateUserSchema, (req: Request, res: Response) => {
  // Rota para cadastrar um novo usuário
  const { name, email }: { name: string; email: string } = req.body;
  createUser(name, email).then((user) => {
    res.status(201).json(user.rows);
  });
});

app.delete("/:id", (req: Request, res: Response) => {
  // Rota para deletar um usuário específico baseado em seu id
  getUserById(req.params.id).then((user) => {
    if (user.rows.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    } else {
      return deleteUser(req.params.id).then((user) => {
        return res.status(204).send();
      });
    }
  });
});

export default app;
