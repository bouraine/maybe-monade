# maybe-monade

Maybe monad implementation in Typescript.
Inspired from Haskell Maybe and Java Optional<T>

> Maybe monad is an abstraction for values that may or may not exist

> Maybe does not replace the exception mechanism but in most cases the use of Maybe to represent the non-existence of a value is more appropriate.

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
