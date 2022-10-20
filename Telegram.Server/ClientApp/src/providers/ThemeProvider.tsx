import {ChangeThemeContext} from "contexts/ChangeThemeContext";
import React, {FC, useEffect} from "react"
import {ThemeContext} from "../contexts/ThemeContext";
import {useDispatch} from "react-redux";
import {choiceTheme} from "../app/slices/authorizationSlice";
import {useAppSelector} from "../app/hooks";
import {loadTheme} from "../utils/loadTheme";
import {useFunction} from "../hooks/useFunction";

type Props = {}

export type Theme = 'dark' | 'light'

export const ThemeProvider: FC<Props> = ({children}) => {
  const theme = useAppSelector(state => state.authorization.theme)
  const dispatch = useDispatch()

  const choice = useFunction((newTheme: Theme) => {
    const classList = document.body.classList;
    const oldTheme = newTheme === 'light'? 'dark': 'light'

    loadTheme(newTheme)
      .then(() => {
        classList.remove(oldTheme)
        classList.add(newTheme)
        dispatch(choiceTheme(newTheme))
      })
  })

  useEffect(() => {
    choice(theme)
  }, [])

  return (
    <ChangeThemeContext.Provider value={choice}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </ChangeThemeContext.Provider>
  )
}