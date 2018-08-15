export declare class Maybe<T> {
  private value;
  static none<T>(): Maybe<T>;
  static fromValue<T>(value: T): Maybe<T>;
  static some<T>(value: T): Maybe<T>;
  private constructor();
  getOrElse(defaultValue: T): T;
  isEmpty(): boolean;
}
