interface IInputEditing {
  withoutSelected(): string
  copy(): void
  selectAll(): void
  selection(): string
}

export class InputEditing implements IInputEditing {
  private _input: { current?:  HTMLTextAreaElement | null };

  constructor(input: { current:  HTMLTextAreaElement | null }) {
    this._input = input;
  }

  input() {
    if (!this._input.current) {
      throw new Error("Input not exists.")
    }
    
    return this._input.current
  }

  copy() {
    navigator.clipboard.writeText(this.selection())
  }

  selectAll() {
    const range = new Range()
    range.selectNode(this.input())
    document.getSelection()?.addRange(range)
  }

  withoutSelected() {
    const input = this.input()
    const value = input.value
    const leftText = value.substring(0, input.selectionStart)
    const rightText = value.substring(input.selectionEnd)
    
    return leftText + rightText;
  }
  
  selection() {
    const input = this.input()
    return input.value.substring(input.selectionStart, input.selectionEnd)
  }
}