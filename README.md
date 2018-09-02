# maybe-monade

Maybe monad implementation in Typescript.
Inspired from Haskell Maybe and Java Optional< T >

> Maybe monad is an abstraction for values that may or may not exist

> Maybe does not replace the exception mechanism but in most cases the use of Maybe to represent the non-existence of a value is more appropriate.

> I recommend this excellent article to understand
> [Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
> or [his javascript translation](https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221)
## Installation

`npm i --save maybe-monade`

## Import 
`import {Maybe} from "maybe-monade"`

## Import <= 1.1.6

`import {Maybe} from "maybe-monade/dist/Maybe"`

### Chaining functions (flatmap, map, do and getOrElse)
```
const isUserAuthenticated: boolean = getUserById(2)
    .flatMap(getUserToken)
    .map<boolean>({expire} => expire > new Date())
    .do(x => console.log)
    .getOrElse(false);

expect(isUserAuthenticated).toBeTruthy();
```
### Maybe.some() and Maybe.none() as a function result

```
export const getUserById = (id: number): Maybe<IUser> => {
  const user: IUser = { id, email: "bob@maybe.com" };
  return id < 1 ? Maybe.none() : Maybe.some(user);
};

export const getUserToken = (user: IUser): Maybe<IAppUser> => {
  const { id, email } = user;
  const appuser: IAppUser = {
    id,
    email,
    token: "HAAZNEBD12",
    expire: new Date(2020, 1, 1)
  };
  return !email ? Maybe.none() : Maybe.some(appuser);
};
```
### Functions
**fromValue< T >(value: T): Maybe< T >**
``` 
const zero = Maybe.fromValue<number>(0);
expect(zero).toEqual({value: 0}); // some maybe

const scoped = () => {
    const undefined = 2;// undefined as variable name
    expect(Maybe.fromValue(undefined))
    .toEqual({value: 2}); // maybe some
};

expect(Maybe.fromValue(undefined))
.toEqual({value: null}); // none maybe

expect(Maybe.fromValue(null))
.toEqual({value: null}); // none maybe
``` 
**getOrElse(defaultValue: T): T** 
```
const getNothing = (): Maybe<number> => Maybe.none();
const value: number = getNothing().getOrElse(0);
expect(value).toEqual(0);
```
**orElse(alternative: () => Maybe< T >): Maybe< T >**
``` 
const getNothing = (): Maybe<number> => Maybe.none();
const value: Maybe<number> = getNothing().orElse(() => Maybe.some(0));
expect(value).toEqual(Maybe.some(0)); //unsafe get
``` 
**map< R >(fmap: (value: T) => R): Maybe< R >**
``` 
const value = Maybe.some(2).map(x => x + 1);
expect(value).toEqual(Maybe.some(3));
```
**flatMap< R >(f: (value: T) => Maybe< R >): Maybe< R >**
``` 
const value = Maybe.some(2).flatMap(x => Maybe.some(x).map(y => y + 1));
expect(value).toEqual(Maybe.some(3));
```
**get(): T**
``` 
const value = Maybe.some(2).get();
expect(value).toEqual(2);
expect(() => Maybe.none().get()).toThrow();
``` 
**do(f: (value: T) => void): Maybe< T >**
``` 
Maybe.some(2).do(console.log); // print 2
``` 
**filter(predicate: (x: T) => boolean): Maybe< T >**
``` 
const value = Maybe.some(2).filter(x => x % 3 === 0);
expect(value).toEqual(Maybe.none());
``` 
**isEmpty()**
``` 
const value = Maybe.none();
expect(value.isEmpty()).toBeTruthy();
``` 
**exists()**
``` 
const value = Maybe.some(2);
expect(value.exists()).toBeTruthy();
``` 

## To clone and run the project

`git clone https://github.com/bouraine/maybe-monade.git`

`npm install` install npm packages

`npm run test` to run jest tests

`npm run test:watch` tests with watch option

`tsc` or `npm run build` to build project

## Contributing to maybe-monade

Feel free to submit issues, request features or contribute by sending a pull request.

### Issues

<https://github.com/bouraine/maybe-monade/issues>

### Pull Requests

<https://github.com/bouraine/maybe-monade/pulls>
