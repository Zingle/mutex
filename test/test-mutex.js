const expect = require("expect.js");
const mutex = require("../mutex");

describe("mutex(*)", () => {
    it("should only allow resource to be acquired once", () => {
        const resource = {};

        mutex(resource);
        expect(mutex(resource)).to.be(false);
        expect(mutex(resource)).to.be(false);
    });

    it("should return release function on first call", () => {
        const resource = {};
        const release = mutex(resource);

        expect(release).to.be.a("function");
        release();

        expect(mutex(resource)).to.be.a("function");
        expect(release).to.throwError();
    });
});

describe("mutex(*, number)", () => {
    it("should timeout", done => {
        const resource = {};

        mutex(resource, 10);
        expect(mutex(resource)).to.be(false);

        setTimeout(() => {
            expect(mutex(resource)).to.be.a("function");
            done();
        }, 25);
    });
});
