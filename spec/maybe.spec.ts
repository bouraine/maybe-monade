import { getUserById, getUserToken } from "../Doc/Examples";
import { IAppUser } from "../Doc/Examples";
import {Maybe} from "../src";
import {ErrorMessages} from "../src/utils";

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
    expect(() => Maybe.some(null)).toThrow(ErrorMessages.emptyValue);
  });

  it("should throw an error", () => {
    expect(() => Maybe.some(null)).toThrow(ErrorMessages.emptyValue);
  });

  it("should add one", () => {
    const just2 = Maybe.fromValue(3.0);
    const add = (x: number) => x + 1;
    const just3 = just2.map(add);
    const div4 = (x: number) => "1" + x;
    const addToTab = (tab: number[]) => tab.map(x => x + 1);
    const justTab = Maybe.fromValue([1, 2, 3]);
    expect(just3.get()).toEqual(3.0 + 1);
    expect(just2.map(div4).get()).toEqual("13");
    expect(justTab.map(addToTab).get()).toEqual([2, 3, 4]);
  });

  it("orelse", () => {
    const getNumber = (): Maybe<number> => Maybe.none();
    const num: Maybe<number> = getNumber().orElse(() => Maybe.fromValue(2));
    expect(num).toEqual(Maybe.fromValue(2));
  });

  it("flatMap", () => {
    const getMaybe = () => Maybe.fromValue(2);
    const p: Maybe<number> = getMaybe().flatMap(() => Maybe.fromValue(2));
    expect(p).toEqual(Maybe.fromValue(2));
  });

  it("should filter", () => {
    const hello = Maybe.fromValue("hello");
    const filtered = hello.filter(t => t === "hello");
    expect(filtered).toEqual(Maybe.fromValue("hello"));
    const none = hello.filter(t => t === "not hello");
    expect(none).toEqual(Maybe.none());
  });

  it("example should work", () => {
    const appuser: IAppUser = {
      id: 1,
      email: "bob@maybe.com",
      token: "HAAZNEBD12",
      expire: new Date(2020, 1, 1)
    };
    const isUserAuthenticated: boolean = getUserById(2)
      .flatMap(getUserToken)
      .map<boolean>(appuser => appuser.expire > new Date())
      .do(x => console.log)
      .getOrElse(false);

    expect(isUserAuthenticated).toBeTruthy();

    const defaultUser: IAppUser = { id: -1, email: "", token: "", expire: null };
    const appUsers: IAppUser[] = [-2, -1, 0, 1].map(n => {
      return getUserById(n)
        .flatMap<IAppUser>(getUserToken)
        .filter(appuser => appuser.expire > new Date())
        .orElse(() => Maybe.fromValue(defaultUser))
        .getOrElse(null);
    });

    expect(appUsers).toEqual([defaultUser, defaultUser, defaultUser, appuser]);
  });
});
