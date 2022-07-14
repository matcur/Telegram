import React from "react";

export type Position = {top: number, left: number}

export type Pagination = {offset: number, count: number, text?: string}

export type ClickHandler<T extends HTMLElement = HTMLElement> = (e: React.MouseEvent<T>) => void