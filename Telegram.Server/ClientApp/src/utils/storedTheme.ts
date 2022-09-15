import {Theme} from "../providers/ThemeProvider";

export const storedTheme = () => {
  let theme: Theme;
  const storedTheme = localStorage.getItem('theme') || '';
  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme = storedTheme
  } else {
    theme = 'dark'
  }
  
  return theme;
}