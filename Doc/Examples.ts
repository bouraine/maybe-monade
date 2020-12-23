import {Maybe} from "../src";

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
    const user: IUser = {id, email: "bob@maybe.com"};
    return id < 1 ? Maybe.none() : Maybe.fromValue(user);
};

export const getUserToken = (user: IUser): Maybe<IAppUser> => {
    const {id, email} = user;
    const appuser: IAppUser = {
        id,
        email,
        token: "HAAZNEBD12",
        expire: new Date(2050, 1, 1)
    };
    return !email ? Maybe.none() : Maybe.some(appuser);
};
