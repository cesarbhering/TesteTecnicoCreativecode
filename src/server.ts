import express from "express";

import { Router, Request, Response } from "express";
import { getUsers, getUserById, createUser } from "./models/queries";
import { validateUserSchema } from "./middlewares/validateUserSchema";

const app = express();

const route = Router();

app.use(express.json());

app.use(route);

route.get("/", (_req: Request, res: Response) => {
  // Rota para listar todos os usuários cadastrados
  const allUsers: Object = getUsers().then((users) => {
    res.json(users.rows);
  });
});

route.get("/:id", (req: Request, res: Response) => {
  // Rota para listar um usuário específico baseado em seu id
  const user: Object = getUserById(req.params.id).then((user) => {
    res.json(user.rows);
  });
});

route.post("/", validateUserSchema, (req: Request, res: Response) => {
  // Rota para cadastrar um novo usuário
  const { name, email }: { name: string; email: string } = req.body;
  const newUser: Object = createUser(name, email).then((user) => {
    res.json(user.rows);
  });
});

app.listen(3333, () => "server running on port 3333");
