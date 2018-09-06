import { f, MaybeCallback } from "./MaybeCallback";
import { ErrorMessages, isNullOrUndefined } from "./utils";

/**
 * A wrapper (abstraction) for a value that may or may not exist
 */
export class Maybe<T> {
  /**
   * Return an instance of Maybe wrapping an empty value
   */
  public static none<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }

  /**
   * if the provided value is not falsy, return an instance of Maybe wrapping a nonempty value,
   * otherwise throw an error
   * @param value the value to wrap in an instance of Maybe
   */
  public static some<T>(value: T): Maybe<T> {
    if (isNullOrUndefined(value)) {
      throw Error(ErrorMessages.emptyValue);
    }
    return new Maybe(value);
  }

  /**
   * return an instance of Maybe wrapping the provided value, otherwise return an instance of empty Maybe
   * @param value value to wrap into a Maybe
   */
  public static fromValue<T>(value: T): Maybe<T> {
    return isNullOrUndefined(value) ? Maybe.none<T>() : Maybe.some(value);
  }

  /**
   * return an instance of Maybe wrapping the provided callback, otherwise return an instance of empty Maybe
   * @param func callback to wrap into a Maybe
   */
  public static fromFunction<R>(func: f<R>): MaybeCallback<R> {
    if (typeof func !== "function") {
      return MaybeCallback.none<R>();
    }
    return MaybeCallback.some<R>(func);
  }

  private constructor(private value: T | null) {}

  /**
   * return true if the wrapped value is empty, false otherwise
   */
  public isEmpty(): boolean {
    return isNullOrUndefined(this.value);
  }

  /**
   * return true if the wrapped value is nonempty, false otherwise
   */
  public exists(): boolean {
    return !isNullOrUndefined(this.value);
  }

  /**
   * get the wrapped value if nonempty, otherwise throw an error
   */
  public get(): T {
    if (this.exists()) {
      return this.value;
    } else {
      throw new Error(ErrorMessages.getEmptyValue);
    }
  }

  /**
   * return the wrapped value if nonempty, otherwise the provided default value.
   */
  public getOrElse(defaultValue: T): T {
    return this.isEmpty() ? defaultValue : this.value;
  }

  /**
   * return the value if nonempty, otherwise invoke alternative
   * and return the result of that invocation.
   * @param alternative the function to invoke
   */
  public orElse(alternative: () => Maybe<T>): Maybe<T> {
    return this.exists() ? Maybe.some(this.value) : alternative();
  }

  /**
   * if the value exists, apply the provided mapping function to it,
   * return an instance of Maybe wrapping the result.
   * @param fmap the function to apply
   */
  public map<R>(fmap: (value: T) => R): Maybe<R> {
    return this.exists() ? Maybe.some(fmap(this.value)) : Maybe.none();
  }

  /**
   * if the wrapped value is nonempty, apply the provided mapping function to it,
   * return that result, otherwise return an instance of empty Maybe.
   * @param func the function to apply
   */
  public flatMap<R>(func: (value: T) => Maybe<R>): Maybe<R> {
    return this.exists() ? func(this.value) : Maybe.none();
  }

  /**
   * apply func to the wrapped value then return an instance of Maybe wrapping
   * the value before applying the func function.
   * func could be console.log for example.
   * @param func function to apply
   */
  public do(func: (value: T) => void): Maybe<T> {
    func(this.value);
    return Maybe.fromValue(this.value);
  }

  /**
   * if the wrapped value is nonempty, and the value matches the given predicate,
   * return a Maybe wrapping the value, otherwise return an instance of empty Maybe
   * @param predicate a predicate to apply to the value if nonempty
   */
  public filter(predicate: (x: T) => boolean): Maybe<T> {
    return this.exists() && predicate(this.value)
      ? Maybe.some(this.value)
      : Maybe.none();
  }
}
