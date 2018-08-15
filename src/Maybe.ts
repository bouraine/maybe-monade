export default class Maybe<T> {
  public static none<T>() {
    return new Maybe<T>(null);
  }
  public static fromValue<T>(value: T) {
    return value ? Maybe.some(value) : Maybe.none<T>();
  }

  public static some<T>(value: T) {
    if (!value) {
      throw Error("Provided value must not be empty");
    }
    return new Maybe(value);
  }

  private constructor(private value: T | null) {}

  public getOrElse(defaultValue: T) {
    return this.value === null ? defaultValue : this.value;
  }

  public isEmpty() {
    return this.value === null;
  }
}
