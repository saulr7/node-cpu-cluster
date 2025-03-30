import { Cluster, ClusterSettings, Worker } from "cluster";
import { EventEmitter } from "stream";

class FakeCluster implements Cluster {
    disconnect(callback?: () => void): void {
        throw new Error("Method not implemented.");
    }
    fork(env?: any): Worker {
        return this as any;
    }
    isMaster: boolean = false;
    isPrimary: boolean = true;
    isWorker: boolean = false;
    schedulingPolicy: number = -1;
    settings: ClusterSettings = {};
    setupMaster(settings?: ClusterSettings): void {
        throw new Error("Method not implemented.");
    }
    setupPrimary(settings?: ClusterSettings): void {
        throw new Error("Method not implemented.");
    }
    worker?: Worker | undefined;
    workers?: NodeJS.Dict<Worker> | undefined;
    SCHED_NONE: number = -1;
    SCHED_RR: number = -1;
    addListener(event: unknown, listener: unknown): this {
        throw new Error("Method not implemented.");
    }
    emit(
        event: unknown,
        worker?: unknown,
        message?: unknown,
        handle?: unknown,
        ...rest: unknown[]
    ): boolean {
        throw new Error("Method not implemented.");
    }
    on(event: unknown, listener: unknown): this {
        return this;
    }
    once(event: unknown, listener: unknown): this {
        throw new Error("Method not implemented.");
    }
    prependListener(event: unknown, listener: unknown): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: unknown, listener: unknown): this {
        throw new Error("Method not implemented.");
    }
    [EventEmitter.captureRejectionSymbol]?<K>(
        error: Error,
        event: string | symbol,
        ...args: any[]
    ): void {
        throw new Error("Method not implemented.");
    }
    removeListener<K>(
        eventName: string | symbol,
        listener: (...args: any[]) => void,
    ): this {
        throw new Error("Method not implemented.");
    }
    off<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(eventName?: string | symbol | undefined): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners<K>(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners<K>(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    listenerCount<K>(
        eventName: string | symbol,
        listener?: Function | undefined,
    ): number {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
}

export default FakeCluster;
