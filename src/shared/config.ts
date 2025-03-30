const PORT = process.env.DATABASE_PORT || 5432;
const USERNAME = process.env.DATABASE_USERNAME || "postgres";
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD || "postgres");
const DATABASE = process.env.DATABASE || "postgres";
const DATABASE_CLUSTER = process.env.DATABASE_CLUSTER || "postgres";

const DB_URL = `postgres://${USERNAME}:${PASSWORD}@${DATABASE_CLUSTER}:${PORT}/${DATABASE}`;
const main = {
    url: DB_URL,
    minPool: process.env.DATABASE_POOL_MIN || 10,
    maxPool: process.env.DATABASE_POOL_MAX || 40,
    sslEnabled: process.env.DATABASE_SSL_DISABLED !== "1",
    loggingEnabled: process.env.DATABASE_LOGGING_ENABLED_V2 === "1",
};

const isCI = process.env.NODE_ENV == "ci";

if (isCI) {
}

export const postgres = main;
