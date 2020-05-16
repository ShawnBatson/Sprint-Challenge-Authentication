const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

afterAll(async () => {
    await db.destroy();
});

describe("testing integration", () => {
    test("testing making new user", async () => {
        const data = {
            username: "testing1",
            password: "testing1",
        };
        const res = await supertest(server).post("/auth/register").send(data);
        expect(res.statusCode).toBe(409);
        expect(res.type).toBe("application/json");
    });
    test("testing logging in", async () => {
        const data = {
            username: "testing1",
            password: "testing1",
        };
        const res = await supertest(server).post("/auth/login").send(data);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
    });
});
