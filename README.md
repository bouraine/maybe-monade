# maybe-monade

Maybe monad implementation in Typescript.
Inspired from haskel Maybe, Java Optional<T> and Scala Option

> Maybe monad is an abstraction for values that may or may not exist

## Installation

`npm i --save maybe-monade`

### Chaining functions (flatmap, map, do and getOrElse)

```
const isUserAuthenticated: boolean = getUserById(2)
    .flatMap(getUserToken)
    .map<boolean>(appuser => appuser.expire > new Date())
    .do(x => console.log)
    .getOrElse(false);

expect(isUserAuthenticated).toBeTruthy();
```

### Chaining functions inside array map

```
const appuser: IAppUser = {
    id: 1,
    email: "bob@maybe.com",
    token: "HAAZNEBD12",
    expire: new Date(2020, 1, 1)
};

const defaultUser: IAppUser = { id: -1, email: "", token: "", expire: null };

const appUsers: IAppUser[] = [-2, -1, 0, 1].map(n => {
    return getUserById(n)
    .flatMap<IAppUser>(getUserToken)
    .filter(appuser => appuser.expire > new Date())
    .orElse(() => Maybe.fromValue(defaultUser))
    .getOrElse(null);
});

expect(appUsers).toEqual([defaultUser, defaultUser, defaultUser, appuser]);
```

### Example source

```
import Maybe from "./Maybe";

export interface IUser {
  id: number;
  email: string;
}

export interface IAppUser extends IUser {
  id: number;
  email: string;
  token: string;
  expire: Date;
}

export const getUserById = (id: number): Maybe<IUser> => {
  const user: IUser = { id, email: "bob@maybe.com" };
  return id < 1 ? Maybe.none() : Maybe.fromValue(user);
};

export const getUserToken = (user: IUser): Maybe<IAppUser> => {
  const { id, email } = user;
  const appuser: IAppUser = {
    id,
    email,
    token: "HAAZNEBD12",
    expire: new Date(2020, 1, 1)
  };
  return !email ? Maybe.none() : Maybe.fromValue(appuser);
};
```

## To clone and run the project

`git clone https://github.com/bouraine/maybe-monade.git`

`npm install` install npm packages

`npm run test` to run jest tests

`npm run test:watch` tests with watch option

`tsc` or `npm run build` to build project
