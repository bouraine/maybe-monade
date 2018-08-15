import Maybe from "./../src/Maybe";

describe("Maybe monad", () => {
  it("should be empty", () => {
    const intNum = Maybe.fromValue<number>(null);
    const str = Maybe.fromValue<string>(null);
    const strNotEmpty = Maybe.fromValue<string>("hello");
    const noneVal = Maybe.none();
    // Assert
    expect(intNum.isEmpty()).toBeTruthy();
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
    const errorMSg = "Provided value must not be empty";
    try {
      // Act
      const nullVal = Maybe.some(null);
      const emptyVal = Maybe.some(null);
      const NanVal = Maybe.some(null);
      // Assert
      expect(nullVal).toThrowError(errorMSg);
      expect(emptyVal).toThrowError(errorMSg);
      expect(NanVal).toThrowError(errorMSg);
    } catch (ex) {
      expect(ex.message).toEqual(errorMSg);
    }
  });
});
