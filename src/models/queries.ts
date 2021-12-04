import "dotenv/config";

const Pool = require("pg").Pool;
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export function getUsers() {
  // Query para pegar todos os usuários da tabela users
  try {
    return pool.query("SELECT * FROM users");
  } catch (error) {
    console.log(error);
  }
}

export function getUserById(id) {
  // Query para pegar um usuário específico da tabela users
  try {
    return pool.query("SELECT * FROM users WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }
}
export function createUser(name, email) {
  // Query para criar um usuário na tabela users
  try {
    return pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );
  } catch (error) {
    console.log(error);
  }
}

export function deleteUser(id) {
  // Query para deletar um usuário da tabela users
  try {
    return pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email", [id]);
  } catch (error) {
    console.log(error);
  }
}
