import cluster, { Cluster } from "cluster";

const master = (numberOfChildren: number, clusterClient: Cluster) => {
    return {
        usingChildEntryPoint: (child: any) => {
            return {
                runChildren: () => {
                    if (clusterClient.isPrimary) {
                        const msg = `Primary ${process.pid} is running, there are ${numberOfChildren} children we will fork`;
                        console.log(msg);

                        for (let i = 0; i < numberOfChildren; i++) {
                            clusterClient.fork();
                        }

                        clusterClient.on(
                            "exit",
                            (worker: any, code: any, signal: any) => {
                                const msg = `worker ${worker.process.pid} died (${signal || code}). starting a new process...`;
                                console.log(msg);
                                clusterClient.fork();
                            },
                        );
                    } else {
                        console.log("Child coming online with pid:", process.pid);
                        child();
                    }
                },
            };
        },
    };
};

const usingCpuClustering = (numCluster = 1, clusterClient: Cluster = cluster) =>
    master(numCluster, clusterClient);

export { usingCpuClustering };
