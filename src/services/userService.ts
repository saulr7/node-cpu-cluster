import { ISqlTX, masterDb } from "../shared/postgtres";

class UserService {
    private tx: ISqlTX;
    constructor(tx: ISqlTX = masterDb) {
        this.tx = tx;
    }

    public async Create(data: ICreateUser) {
        const { name, password, active = true } = data;
        const props = [name, password, active];

        return await this.tx.query(
            `INSERT INTO users (name, password, active)
              VALUES ($1, $2, $3)
              RETURNING id;
              `,
            props,
        );
    }

    public async GetAll() {
        return await this.tx.query("SELECT * FROM users");
    }
}

export default UserService;
