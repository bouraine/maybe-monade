export const Errors = {
  emptyValue: "Provided value must not be empty"
};

export default class Maybe<T> {
  public static none<T>() {
    return new Maybe<T>(null);
  }

  public static fromValue<T>(value: T) {
    return value ? Maybe.some(value) : Maybe.none<T>();
  }

  public static some<T>(value: T) {
    if (!value) {
      throw Error(Errors.emptyValue);
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

  public exists() {
    return this.value !== null;
  }

  public get() {
    return this.value;
  }

  public map<R>(fmap: (value: T) => R): Maybe<R> {
    return Maybe.some(fmap(this.value));
  }
}
