import express from "express";
import route from "./app";

export const server = express();

server.use(express.json());

server.use("/", route);

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
