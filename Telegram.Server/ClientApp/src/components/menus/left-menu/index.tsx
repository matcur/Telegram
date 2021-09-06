import React, {ReactElement, useContext} from 'react'
import {LeftMenuUserInfo} from "./LeftMenuUserInfo";
import {Item, LeftMenuItem} from "./LeftMenuItem";
import {ReactComponent as PeopleIcon} from "public/svgs/people.svg";
import {ReactComponent as SpeakerIcon} from "public/svgs/speacker.svg";
import {ReactComponent as PhoneIcon} from "public/svgs/phone.svg";
import {ReactComponent as PersonIcon} from "public/svgs/person.svg";
import {ReactComponent as GearIcon} from "public/svgs/gear.svg";
import {ReactComponent as MoonIcon} from "public/svgs/moon.svg";
import {Toggler} from "components/form/Toggler";
import {NewGroupForm} from "components/forms/NewGroupForm";
import {UpLayerContext} from "contexts/UpLayerContext";
import {LeftMenuContext} from "contexts/LeftMenuContext";

type Props = {
  visible: boolean
}

export const LeftMenu = ({visible}: Props) => {
  const layerContext = useContext(UpLayerContext)
  const menuContext = useContext(LeftMenuContext)

  const showForm = (form: ReactElement) => {
    menuContext.setVisible(false)
    layerContext.setCentralElement(form)
  }
  const items: Item[] = [
    {name: 'New Group', icon: <PeopleIcon/>, onClick: () => showForm(<NewGroupForm/>)},
    {name: 'New Channel', icon: <SpeakerIcon/>},
    {name: 'Contacts', icon: <PersonIcon/>},
    {name: 'Calls', icon: <PhoneIcon/>},
    {name: 'Settings', icon: <GearIcon/>},
    {name: 'Night Mode', icon: <MoonIcon/>, additionalElement: <Toggler/>},
  ]

  return (
    <div className={'left-menu' + (visible? ' show-left-menu': '')}>
      <LeftMenuUserInfo/>
      <div className="left-menu-options">
        {items.map((i, key) => <LeftMenuItem key={key} item={i}/>)}
      </div>
      <div className="left-menu-app-info">
        <strong>Telegram Desktop</strong>
        <div className="app-version">Version 2.9.2 x64 - About</div>
      </div>
    </div>
  )
}