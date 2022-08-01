import React from "react";

type TextProps = {
  text: string
  rowsRef: React.RefObject<HTMLDivElement>
  setLastRowWidth(value: number): void
}

type State = {
  textOffset: number
}

export class TextRows extends React.Component<TextProps, State> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      textOffset: 0
    }
  }

  lastSpanRef: HTMLSpanElement | null = null

  firstSpanRef: HTMLSpanElement | null = null

  previousSpanHeight: number = 0
  previousSpanWidth: number = 0

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    const firstBoundary = this.lastSpanRef?.getBoundingClientRect()
    const secondBoundary = this.firstSpanRef?.getBoundingClientRect()
    if (!firstBoundary || !secondBoundary || !this.props.text) {
      return
    }
    if (firstBoundary.top === secondBoundary.top && firstBoundary.bottom === secondBoundary.bottom) {
      return this.props.setLastRowWidth(firstBoundary.width + secondBoundary.width)
    }
    if (this.previousSpanHeight && this.previousSpanHeight !== firstBoundary.height) {
      return this.props.setLastRowWidth(this.previousSpanWidth)
    }

    this.previousSpanWidth = firstBoundary.width
    this.previousSpanHeight = firstBoundary.height
    this.setState(state => ({textOffset: state.textOffset + 4}))
  }

  render() {
    const length = this.props.text.length;
    const rows = [
      this.props.text.slice(0, length - this.state.textOffset),
      this.props.text.slice(length - this.state.textOffset)
    ]

    return (
      <span ref={this.props.rowsRef}>
        {rows.map((row, i) =>
          <span ref={ref => i === 0 ? (this.firstSpanRef = ref) : (this.lastSpanRef = ref)}>{row}</span>)}
      </span>
    )
  }
}