import {User} from "models";

export const sameUsers = (a: User, b: User) => a.id === b.id