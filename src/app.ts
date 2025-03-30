import express, { Request, Response } from "express";
import UserService from "./services/userService";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "ok", ok: true });
});

app.post("/data", async (req: Request, res: Response) => {
    const data = req.body;
    res.json({ data });
});

app.get("/users", async (req: Request, res: Response) => {
    const userService = new UserService();
    const users = await userService.GetAll();
    res.json({ data: users });
});

app.post("/users", async (req: Request, res: Response) => {
    const userService = new UserService();
    const payload = req.body;
    const users = await userService.Create(payload);
    res.json({ data: users });
});

export default app;
