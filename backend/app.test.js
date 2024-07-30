const request = require("supertest");
const app = require("./index.js");

describe("POST /login", () => {

    describe("when passed a email and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/login").send({
                email: "email",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })
        test("should specify json as the content type in the http header", async () => {
            const response = await request(app).post("/login").send({
                email: "email",
                password: "password"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
        test("should contain a access token in the response body", async () => {
            const response = await request(app).post("/login").send({
                email: "email",
                password: "password"
            })
            expect(response.body.accessToken).toBeDefined()
        })
    })
    describe("when the email or password is missing", () => {
        test("should return a 400 status code", async() => {
            const bodies = [
              { email: "email" },
              { password: "password" },
              {}
            ]
            for (const body of bodies) {
              const response = await request(app).post("/login").send(body)
              expect(response.statusCode).toBe(400)
            }
          })
      })
})