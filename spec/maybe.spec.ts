import Maybe, { Errors } from "../src/Maybe";

describe("Maybe monad", () => {
  it("should be empty", () => {
    const intNum = Maybe.fromValue<number>(null);
    const str = Maybe.fromValue<string>(null);
    const strNotEmpty = Maybe.fromValue<string>("hello");
    const noneVal = Maybe.none();
    // Assert
    expect(intNum.isEmpty()).toBeTruthy();
    expect(intNum.exists()).toBeFalsy();
    expect(intNum.getOrElse(0)).toEqual(0);
    expect(str.isEmpty()).toBeTruthy();
    expect(strNotEmpty.isEmpty()).toBeFalsy();
    expect(noneVal.isEmpty()).toBeTruthy();
  });

  it("should return the right value", () => {
    const intNum = Maybe.fromValue<number>(12);
    const val = intNum.getOrElse(null);
    const str = Maybe.fromValue<string>("12");
    const strVal = str.getOrElse(null);
    // Assert
    expect(val).toEqual(12);
    expect(strVal).toEqual("12");
  });

  it("should throw error", () => {
    expect(() => Maybe.some(null)).toThrow(Errors.emptyValue);
  });

  it("should throw an error", () => {
    expect(() => Maybe.some(null)).toThrow(Errors.emptyValue);
  });

  it("should add one", () => {
    const just2 = Maybe.fromValue(3.0);
    const add = (x: number) => x + 1;
    const just3 = just2.map(add);
    const div4 = (x: number) => "" + x;
    const addToTab = (tab: number[]) => tab.map(x => x + 1);
    const justTab = Maybe.fromValue([1, 2, 3]);
    expect(just3.get()).toEqual(3.0 + 1);
    expect(just2.map(div4).get()).toEqual("3");
    expect(justTab.map(addToTab).get()).toEqual([2, 3, 4]);
  });
});
