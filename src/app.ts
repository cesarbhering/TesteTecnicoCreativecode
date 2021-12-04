import { Request, Response } from "express";
import { getUsers, getUserById, createUser,  } from "./models/queries";
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

app.post("/", validateUserSchema, (req: Request, res: Response) => {
  // Rota para cadastrar um novo usuário
  const { name, email }: { name: string; email: string } = req.body;
  const newUser: Object = createUser(name, email).then((user) => {
    res.status(201).json(user.rows);
  });
});

app.get("/:id", (req: Request, res: Response) => {
  // Rota para listar um usuário específico baseado em seu id
  const user: Object = getUserById(req.params.id).then((user) => {
    res.json(user.rows);
  });
});

app.delete("/:id", (req: Request, res: Response) => {
  // Rota para deletar um usuário específico baseado em seu id
  const user: Object = getUserById(req.params.id).then((user) => {
    if (user.rows.length === 0) {
      res.status(404).send("Usuário não encontrado");
    } else {
      const deleteUser: Object = getUserById(req.params.id).then((user) => {
        res.json(user.rows);
      });
    }
  });
});

export default app;
