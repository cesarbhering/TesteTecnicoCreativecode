import { Router, Request, Response } from "express";
import { getUsers, getUserById, createUser } from "./models/queries";
import { validateUserSchema } from "./middlewares/validateUserSchema";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  // Rota para listar todos os usuários cadastrados
  getUsers().then((users) => {
    return res.status(200).json(users.rows);
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

export default route;
