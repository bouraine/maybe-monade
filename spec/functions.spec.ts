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
        expect(value).toEqual(Maybe.some(3));
    });
    it("get", () => {
        const value = Maybe.some(2).get();
        expect(value).toEqual(2);
        expect(() => Maybe.none().get()).toThrow();
    });
    it("do", () => {
        Maybe.some(2).do(console.log); // print 2
    });
    it("filter", () => {
        const value = Maybe.some(2).filter(x => x % 3 === 0);
        expect(value).toEqual(Maybe.none());
    });
    it("isEmpty", () => {
        const value = Maybe.none();
        expect(value.isEmpty()).toBeTruthy();
    });
    it("exists", () => {
        const value = Maybe.some(2);
        expect(value.exists()).toBeTruthy();
    });
});
