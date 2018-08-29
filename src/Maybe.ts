export const Errors = {
    emptyValue: "Provided value must not be empty",
    getEmptyValue: "You try to access an empty value"
};


/**
 * A wrapper (abstraction) for a value that may or may not exist
 */
export class Maybe<T> {

    /**
     * Return an instance of Maybe wrapping an empty value
     */
    public static none<T>() {
        return new Maybe<T>(null);
    }

    /**
     * return an instance of Maybe wrapping the provided value, otherwise return an instance of empty Maybe
     * @param value value to wrap into a Maybe
     */
    public static fromValue<T>(value: T): Maybe<T> {
        return value ? Maybe.some(value) : Maybe.none<T>();
    }

    /**
     * if the provided value is not falsy, return an instance of Maybe wrapping a nonempty value,
     * otherwise throw an error
     * @param value the value to wrap in an instance of Maybe
     */
    public static some<T>(value: T): Maybe<T> {
        if (value === undefined || value === null) {
            throw Error(Errors.emptyValue);
        }
        return new Maybe(value);
    }
    private readonly value: T;
    private constructor(value: T | null) {
        this.value = value;
    }

    /**
     * return true if the wrapped value is empty, false otherwise
     */
    public isEmpty() {
        return this.value === null;
    }

    /**
     * return true if the wrapped value is nonempty, false otherwise
     */
    public exists() {
        return this.value !== null;
    }

    /**
     * get the wrapped value
     */
    public get(): T {
        if (this.exists()) {
            return this.value;
        } else {
            throw new Error(Errors.getEmptyValue);
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
     * if ths value exists, apply the provided mapping function to it,
     * return an instance of Maybe wrapping the result.
     * @param fmap the function to apply
     */
    public map<R>(fmap: (value: T) => R): Maybe<R> {
        return this.exists() ? Maybe.some(fmap(this.value)) : Maybe.none();
    }

    /**
     * if the wrapped value is nonempty, apply the provided mapping function to it,
     * return that result, otherwise return an instance of empty Maybe.
     * @param f the function to apply
     */
    public flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R> {
        return this.exists() ? f(this.value) : Maybe.none();
    }

    /**
     * apply f to the wrapped value then return an instance of Maybe wrapping
     * the value before applying the f function.
     * f could be console.log for example.
     * @param f function to apply
     */
    public do(f: (value: T) => void): Maybe<T> {
        f(this.value);
        return Maybe.fromValue(this.value);
    }

    /**
     * if the wrapped value is nonempty, and the value matches the given predicate,
     * return a Maybe wrapping the value, otherwise return an instance of empty Maybe
     * @param predicate a predicate to apply to the value if nonempty
     */
    public filter(predicate: (x: T) => boolean): Maybe<T> {
        return this.exists() && predicate(this.value) ? Maybe.some(this.value) : Maybe.none();
    }
}
