import {TextField, TextFieldProps} from "./TextField";
import "styles/forms/base-form.sass"
import React from "react";

type Props = Omit<TextFieldProps, "labelClassName" | "inputClassName">

export const SmallTextField = (props: Props) => {
  return (
    <TextField
      {...props}
      labelClassName="small-label"
      inputClassName="small-input"
    />
  )
}