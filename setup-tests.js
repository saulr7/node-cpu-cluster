const { Client } = require("pg");

require("dotenv").config();

const PORT = process.env.DATABASE_PORT || 5432;
const USERNAME = process.env.DATABASE_USERNAME || "postgres";
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD || "postgres");
const DATABASE = process.env.DATABASE || "postgres";
const DATABASE_CLUSTER = process.env.DATABASE_CLUSTER || "localhost";

const setupDatabase = async () => {
    try {
        const DB_URL = `postgres://${USERNAME}:${PASSWORD}@${DATABASE_CLUSTER}:${PORT}/${DATABASE}`;
        console.log(DB_URL, USERNAME);

        const dbClient = new Client(DB_URL);
        dbClient.connect();
        console.log("Setting up the database...");

        try {
            await dbClient.query(`CREATE DATABASE ${DATABASE};`);
        } catch (e) {
            console.log(e);
        }

        await dbClient.query(`
          CREATE TABLE if not exists users2  (
            id bigserial not null,
            name varchar(100) not null,
            password varchar(100) not null,
            active bool not null default true,
            created_at timestamp default now ());
        `);
        console.log("Database created successfully.");
    } catch (e) {
        console.log(e);
    }
};

const setUp = async () => {
    await setupDatabase();
};

setUp();
