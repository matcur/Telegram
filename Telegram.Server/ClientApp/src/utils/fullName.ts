import {User} from "../models";

export const fullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`
}