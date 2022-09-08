import React, {useCallback, useContext, useState} from 'react'
import {LeftMenuUserInfo} from "./LeftMenuUserInfo";
import {LeftMenuItem} from "./LeftMenuItem";
import {ReactComponent as PeopleIcon} from "public/svgs/people.svg";
import {ReactComponent as SpeakerIcon} from "public/svgs/speacker.svg";
import {ReactComponent as PhoneIcon} from "public/svgs/phone.svg";
import {ReactComponent as PersonIcon} from "public/svgs/person.svg";
import {ReactComponent as GearIcon} from "public/svgs/gear.svg";
import {ReactComponent as MoonIcon} from "public/svgs/moon.svg";
import {Toggler} from "components/form/Toggler";
import {NewGroupForm} from "components/forms/NewGroupForm";
import {SettingsForm} from "../../forms/SettingsForm";
import {nope, Nothing} from "../../../utils/functions";
import {ChangeThemeContext} from "../../../contexts/ChangeThemeContext";
import {useTheme} from "../../../hooks/useTheme";

type Props = {
  visible: boolean
  onItemClick?: Nothing
}

export const LeftMenu = ({visible, onItemClick = nope}: Props) => {
  const changeTheme = useContext(ChangeThemeContext)
  const theme = useTheme()
  const [darkTheme, setDarkTheme] = useState(theme === 'dark')
  const onThemeChange = useCallback((isDarkTheme: boolean) => {
    setDarkTheme(isDarkTheme)
    if (isDarkTheme) {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  }, [changeTheme])

  return (
    <div className={'left-menu' + (visible? ' show-left-menu': '')}>
      <LeftMenuUserInfo/>
      <div className="left-menu-options">
        <LeftMenuItem
          onClick={onItemClick}
          name="New Group"
          icon={<PeopleIcon/>}
          getCentralElement={(hide: () => void) => <NewGroupForm hide={hide}/>}
        />
        <LeftMenuItem
          onClick={onItemClick}
          name="New Channel"
          icon={<SpeakerIcon/>}
        />
        <LeftMenuItem
          onClick={onItemClick}
          name="Contacts"
          icon={<PersonIcon/>}
        />
        <LeftMenuItem
          onClick={onItemClick}
          name="Calls"
          icon={<PhoneIcon/>}
        />
        <LeftMenuItem
          onClick={onItemClick}
          name="Settings"
          icon={<GearIcon/>}
          getCentralElement={(hide: () => void) => <SettingsForm hide={hide}/>}
        />
        <LeftMenuItem
          onClick={nope}
          name="Night Mode"
          icon={<MoonIcon/>}
          additionalElement={() => (<Toggler value={darkTheme} setValue={onThemeChange}/>)}
        />
      </div>
      <div className="left-menu-app-info">
        <strong>Telegram Desktop</strong>
        <div className="app-version">Version 2.9.2 x64 - About</div>
      </div>
    </div>
  )
}