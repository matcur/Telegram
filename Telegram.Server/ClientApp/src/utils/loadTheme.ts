import {Theme} from "../providers/ThemeProvider";

export const loadTheme = (theme: Theme) => {
  const resetTransitionStyle = document.createElement("style");
  resetTransitionStyle.classList.add('fuck')
  document.head.appendChild(resetTransitionStyle)
  resetTransitionStyle.innerText =
    'body * {' +
    '  transition: all 0s' +
    '}'

  return import(`styles/themes/${theme}/indexPage.sass`)
    .then((args) => console.log(`${theme} loaded`, args))
    .catch((e) => console.error(`Error occurred while loading ${theme} theme`, e))
    .finally(() => setTimeout(() => resetTransitionStyle.remove(), 1))
}