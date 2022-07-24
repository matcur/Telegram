import {User} from "../models";
import {fullName} from "./fullName";

export const userNames = (users: User[], separator: string = ", ") => {
  return users.map(fullName).join(separator)
}