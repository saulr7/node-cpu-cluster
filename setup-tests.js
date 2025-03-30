const { Client } = require("pg");

require("dotenv").config();

const PORT = process.env.DATABASE_PORT || 5432;
const USERNAME = process.env.DATABASE_USERNAME || "test";
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD || "test");
const DATABASE = process.env.DATABASE || "testDB";
const DATABASE_CLUSTER = process.env.DATABASE_CLUSTER || "localhost";

const setupDatabase = async () => {
    try {
        const DB_URL = `postgres://${USERNAME}:${PASSWORD}@${DATABASE_CLUSTER}:${PORT}/${DATABASE}`;
        console.log(DB_URL);

        const dbClient = new Client({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: "postgres",
            password: "postgres",
            database: "postgres",
        });

        dbClient.connect();
        console.log("Setting up the database...");

        try {
            await dbClient.query(`CREATE DATABASE ${DATABASE};`);
        } catch (e) {}

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
        // console.log(e);
    }
};

const setUp = async () => {
    await setupDatabase();
};

setUp();
