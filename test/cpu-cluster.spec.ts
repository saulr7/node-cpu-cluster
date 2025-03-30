import sinon from "sinon";
import { expect } from "chai";
import { usingCpuClustering } from "../src/cpu-cluster";
import { Cluster } from "cluster";
import FakeCluster from "./mocks/fakeCluster";

const fakeApp = {
    listen: () => {},
};

describe("Cpu cluster", function () {
    let fakeCluster: Cluster = new FakeCluster();

    let spyCluster: any;
    let spyApp: any;

    this.beforeAll(() => {
        fakeCluster = new FakeCluster();
        spyCluster = sinon.spy(fakeCluster);
        spyApp = sinon.spy(fakeApp);
    });

    const CLUSTER_CHILDREN = 10;

    it("should call fork", function () {
        usingCpuClustering(CLUSTER_CHILDREN, fakeCluster)
            .usingChildEntryPoint(() => {
                fakeApp.listen();
            })
            .runChildren();

        expect(spyCluster.fork.callCount == CLUSTER_CHILDREN);
        expect(spyApp.listen.callCount == CLUSTER_CHILDREN);
    });
});
