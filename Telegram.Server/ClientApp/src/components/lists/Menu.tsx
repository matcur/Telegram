import React, {ReactNode} from "react";
import {classNames} from "../../utils/classNames";

export type Option = {
  content: ReactNode
  children?: Option[]
  className?: string
  contentClassName?: string
  onClick?(): void
}

type Props = {
  options: Option[]
  afterClick(): void
}

export const Menu = ({options, afterClick}: Props) => {
  const make = (option: Option) => {
    const hasChildren = Boolean(option.children && option.children.length > 0)
    
    return (
      <div
        className={classNames("menu-option", option.className)}
        onClick={option.onClick}
      >
        <span className={option.contentClassName}>{option.content}</span>
        {hasChildren && (
          <>
            <div className="menu-option-triangle"/>
            <div className="sub-menu">
              <Menu options={option.children!} afterClick={afterClick}/>
            </div>
          </>
        )}
      </div>
    )
  }
  
  return (
    <div className="menu">
      {options.map(make)}
    </div>
  )
}