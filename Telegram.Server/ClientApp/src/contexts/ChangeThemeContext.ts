import {createContext} from "react";
import {Theme} from "../providers/ThemeProvider";

export const ChangeThemeContext = createContext((theme: Theme) => {})