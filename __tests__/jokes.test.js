const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

describe("Testing integration on jokes", () => {
    test("testing getting jokes", async () => {
        const res = await supertest(server).get("/jokes");
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
    });
});
