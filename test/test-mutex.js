const expect = require("expect.js");
const mutex = require("../mutex");

describe("mutex(*)", () => {
    it("should only allow resource to be acquired once", done => {
        const resource = {};

        mutex(resource, 10000);
        expect(mutex(resource)).to.be(false);
        expect(mutex(resource)).to.be(false);

        setTimeout(() => {
            expect(mutex(resource)).to.be(false);
            done();
        }, 25);
    });

    it("should work on scalar values", () => {
        const str = "foo";
        const num = 3;

        expect(mutex(str)).to.not.be(false);
        expect(mutex(str)).to.be(false);

        expect(mutex(num)).to.not.be(false);
        expect(mutex(num)).to.be(false);
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
