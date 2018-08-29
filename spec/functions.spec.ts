import {Maybe} from "../src";

describe("Maybe functions", () => {
    it("getOrElse", () => {
        const getNothing = (): Maybe<number> => Maybe.none();
        const value: number = getNothing().getOrElse(0);
        expect(value).toEqual(0);
    });
    it("orElse", () => {
        const getNothing = (): Maybe<number> => Maybe.none();
        const value: Maybe<number> = getNothing().orElse(() => Maybe.some(0));
        expect(value).toEqual(Maybe.some(0));
    });
    it("map", () => {
        const value = Maybe.some(2).map(x => x + 1);
        expect(value).toEqual(Maybe.some(3));
    });
    it("flatmap", () => {
        const value = Maybe.some(2).flatMap(x => Maybe.some(x).map(y => y + 1));
        expect(value).toEqual(Maybe.some(Maybe.some(3)));
    });
    it("get", () => {
        const value = Maybe.some(2).get();
        expect(value).toEqual(2);
        const value2 = Maybe.none().get();
        expect(value2).toThrowError();
    });
    it("do", () => {
        const value = Maybe.some(2);
        expect(value).toEqual(2);
    });
    it("flatmap", () => {
        const value = Maybe.some(2);
        expect(value).toEqual(2);
    });
    it("filter", () => {
        const value = Maybe.some(2);
        expect(value).toEqual(2);
    });
    it("isEmpty", () => {
        const value = Maybe.some(2);
        expect(value).toEqual(2);
    });
    it("exists", () => {
        const value = Maybe.some(2);
        expect(value).toEqual(2);
    });
});
