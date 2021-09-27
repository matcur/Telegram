import {same} from "utils/same";
import {User} from "models";
import {sameUsers} from "utils/sameUsers";

const classes = {
  single: 'single-message',
  first: 'first-in-row-message',
  previous: 'previous-in-row-message',
  last: 'last-in-row-message',
}

export const inRowPositionClass = (previous: User, current: User, next: User) => {
  if (!sameUsers(previous, current) && !sameUsers(current, next)) {
    return classes.single
  }

  if (same([previous, current, next], sameUsers)) {
    return classes.previous
  }

  if (sameUsers(previous, current) && !sameUsers(current, next)) {
    return classes.last
  }

  return classes.first
}