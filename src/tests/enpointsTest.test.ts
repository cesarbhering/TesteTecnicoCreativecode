import {server} from "../server";
import request from "supertest";

describe("Endpoints", () => {

  it("should be able to see all users",  () => {
    const teste = request(server).get("/").expect(200);

  });
});
