import request, { Agent } from "supertest";
import { expect } from "chai";

import app from "../src/app";

describe("Express App", function () {
    let mockApp: Agent;
    this.beforeAll(() => {
        mockApp = request(app);
    });

    const toString = (d: any) => JSON.stringify(d);

    it("should return 200 at /", async () => {
        const res = await mockApp.get("/");
        expect(res.status).eq(200);
        expect(res.body.message).eq("ok");
    });

    it("should return 404 at /404", async () => {
        const res = await mockApp.get("/404");

        expect(res.status).eq(404);
    });

    it("should return body at /data", async () => {
        const payload = { ok: true };
        const res = await mockApp.post("/data").send(payload);

        expect(res.status).eq(200);
        expect(toString(res.body.data)).eq(toString(payload));
    });
});
