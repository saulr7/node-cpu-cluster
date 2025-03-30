const { Client } = require("pg");

require("dotenv").config();

const PORT = process.env.DATABASE_PORT || 5432;
const USERNAME = process.env.DATABASE_USERNAME || "postgres";
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD || "postgres");
const DATABASE = process.env.DATABASE || "postgres";
const DATABASE_CLUSTER = process.env.DATABASE_CLUSTER || "postgres";

const setupDatabase = async () => {
    const DB_URL = `postgres://${USERNAME}:${PASSWORD}@${DATABASE_CLUSTER}:${PORT}/${DATABASE}`;

    const dbClient = new Client(DB_URL);
    dbClient.connect();

    await dbClient.query(`
          CREATE TABLE if not exists users  (
            id bigserial not null,
            name varchar(100) not null,
            password varchar(100) not null,
            active bool not null default true,
            created_at timestamp default now ());
        `);
};

const setUp = async () => {
    await setupDatabase();
};

setUp();
