import {server} from "../server";
import request from "supertest";

describe("Endpoints", () => {

  it("should be able to see all users", done => {
    const response = request(server).get("/").send().expect(200);
    done();
  });
});
