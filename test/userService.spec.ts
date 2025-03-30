import { expect } from "chai";
import UserService from "../src/services/userService";
import { masterDb } from "../src/shared/postgtres";

const { query } = masterDb;

describe.skip("userService", function () {
    let userService: UserService;
    this.beforeAll(async () => {
        userService = new UserService();
    });

    this.beforeEach(async () => {
        await query("DELETE FROM users", []);
    });

    it("should create user ", async () => {
        const data = { name: "ras101", password: "het", active: false };
        const [{ id }] = await userService.Create(data);

        expect(+id).to.be.gt(0);
    });

    it("should create user ", async () => {
        const data = { name: "ras101", password: "het", active: false };
        await userService.Create(data);
        const users = await userService.GetAll();

        expect(users.length).eq(1);
        expect(users[0].name).eq(data.name);
    });
});
