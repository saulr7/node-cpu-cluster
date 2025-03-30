import { availableParallelism } from "node:os";
import app from "./app";
import dotenv from "dotenv";
import { usingCpuClustering } from "./cpu-cluster";

dotenv.config();

const port = process.env.PORT || 4002;
const CLUSTER_CHILDREN = Number(availableParallelism() || 1);

usingCpuClustering(CLUSTER_CHILDREN)
    .usingChildEntryPoint(() => {
        app.listen(port, () => {
            console.log(`The server is running at http://localhost:${port}`);
        });
    })
    .runChildren();
