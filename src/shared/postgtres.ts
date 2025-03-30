import { Pool, PoolClient } from "pg";
import { postgres } from "./config";
import promiseRetry from "promise-retry";

const isolation = {
    tx: "READ COMMITTED",
    rrtx: "REPEATABLE READ",
    stx: "SERIALIZABLE",
};

export type isolationType = "tx" | "rrtx" | "stx";

export interface ISqlTX {
    query(sql: string, args?: any, client?: Pool | PoolClient): Promise<any[]>;
    single(sql: string, args?: any, client?: Pool | PoolClient): Promise<any>;
    isInSafeTX: boolean;
}

const usePostgres = (url: string) => {
    const pool = new Pool({
        connectionString: url,
        max: +postgres.maxPool,
        min: +postgres.minPool,
        connectionTimeoutMillis: 10000,
        idle_in_transaction_session_timeout: 60000,
        idleTimeoutMillis: 60000,
    });

    const query = (sql: string, args: any, client: Pool | PoolClient = pool) =>
        client.query(sql, args).then((x) => x.rows);

    const single = (sql: string, args: any, client: Pool | PoolClient = pool) =>
        client.query(sql, args).then((x) => x.rows[0]);

    let isInSafeTX = false;

    const beginTX = async <T>(
        level: isolationType,
        cb: (tx: ISqlTX) => Promise<T>,
    ) => {
        return await promiseRetry(
            async (retry) => {
                const tx = await pool.connect();

                const isoLevel = isolation[level];
                isInSafeTX = ["rrtx", "stx"].includes(level);

                await tx.query(`begin transaction isolation level ${isoLevel}`);
                try {
                    let res = await cb({
                        query: (sql: string, args: any) => query(sql, args, tx),
                        single: (sql: string, args: any) => single(sql, args, tx),
                        isInSafeTX,
                    });
                    await tx.query("commit;");
                    return res;
                } catch (err: any) {
                    console.log(err);
                    // serialization failure
                    const is40001 = err.code === "40001";
                    const FAILED_TO_ACQUIRE_LOCK = 1000;
                    if (is40001 || err.code === FAILED_TO_ACQUIRE_LOCK) {
                        await tx.query(`rollback;`);
                        console.log("retrying query");
                        return retry({ message: "Serialization failure." });
                    }

                    await tx.query(`rollback;`);
                    // some other error, maybe an assertion etc.
                    throw err;
                } finally {
                    tx.release();
                }
            },
            { retries: 10, minTimeout: 2, randomize: true },
        );
    };
    return { query, single, beginTX, isInSafeTX };
};

export const masterDb = usePostgres(postgres.url);
