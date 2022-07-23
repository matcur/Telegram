import React, {useState} from 'react'
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

type Props = {
  visible: boolean
  onItemClick?: Nothing
}

export const LeftMenu = ({visible, onItemClick = nope}: Props) => {
  const [needNightMode, setNeedNightMode] = useState(false)
  const [items] = useState(() => [
    {name: 'New Group', icon: <PeopleIcon/>, getCentralElement: (hide: () => void) => <NewGroupForm hide={hide}/>},
    {name: 'New Channel', icon: <SpeakerIcon/>},
    {name: 'Contacts', icon: <PersonIcon/>},
    {name: 'Calls', icon: <PhoneIcon/>},
    {name: 'Settings', icon: <GearIcon/>, getCentralElement: (hide: () => void) => <SettingsForm hide={hide}/>},
    {name: 'Night Mode', icon: <MoonIcon/>, additionalElement: <Toggler value={needNightMode} setValue={setNeedNightMode}/>},
  ])

  return (
    <div className={'left-menu' + (visible? ' show-left-menu': '')}>
      <LeftMenuUserInfo/>
      <div className="left-menu-options">
        {items.map((i, key) => (
          <LeftMenuItem
            key={key}
            onClick={onItemClick}
            name={i.name}
            icon={i.icon}
            getCentralElement={i.getCentralElement}
          />
        ))}
      </div>
      <div className="left-menu-app-info">
        <strong>Telegram Desktop</strong>
        <div className="app-version">Version 2.9.2 x64 - About</div>
      </div>
    </div>
  )
}