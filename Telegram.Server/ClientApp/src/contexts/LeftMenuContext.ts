import {createContext} from "react";
import {nope} from "../utils/functions";

export const LeftMenuContext = createContext({show: nope, hide: nope})