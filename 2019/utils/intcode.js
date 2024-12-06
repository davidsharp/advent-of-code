// used in 2, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25

class Interpreter {
  static instructions = {
    1: 'add',
    2: 'mult',
    3: 'in',
    4: 'out',
    5: 'jumpIfTrue',
    6: 'jumpIfFalse',
    7: 'lessThan',
    8: 'equals',
    99: 'end',
  }
  // parameter modes
  static MODES = {
    POSITION: 0,
    IMMEDIATE: 1,
  }
  halted = false
  pointer = 0 // instruction pointer
  cells = [] // {}?
  input = null
  output = console.log //default
  constructor(input, output) {
    this.cells = input.split(',').map(Number)
    if(output) this.output = output
  }
  run() { while (!this.halted) {
    const [inst,modes] = this.parse(this.cells[this.pointer])
    const instruction = Interpreter.instructions[inst]
    this[instruction](modes)
  } }
  pipe(value) { this.input = value }
  step(x=1) {
    this.pointer += x
    if (this.pointer > this.cells.length) {
      this.halted = true
    }
  }
  parse(value) {
    const instruction = value % 100
    let temp = Math.floor(value/100)
    const parameterModes = []
    while (temp>0) {
      parameterModes.push(temp%10)
      temp = Math.floor(temp/10)
    }
    return [instruction,parameterModes]
  }
  poke(idx,value) { this.cells[idx] = value }
  get(value, mode) {
    if(mode == Interpreter.MODES.IMMEDIATE)
      return value
    else // Interpreter.MODES.POSITION
      return this.cells[value]
  }
  getParams(count=1) {
    return this.cells.slice(this.pointer+1,this.pointer+count+1)
  }
  add(modes) {
    const [a,b,out] = this.getParams(3)
    this.cells[out] = this.get(a,modes[0]) + this.get(b,modes[1])
    this.step(4)
  }
  mult(modes) {
    const [a,b,out] = this.getParams(3)
    this.cells[out] = this.get(a,modes[0]) * this.get(b,modes[1])
    this.step(4)
  }
  in() {
    this.cells[this.cells[this.pointer+1]] = this.input
    this.step(2)
  }
  out(modes) {
    this.output(this.get(this.cells[this.pointer+1],modes[0]))
    this.step(2)
  }
  jumpIfTrue(modes) {
    const [a,jumpTo] = this.getParams(2)
    if (this.get(a,modes[0])!=0) this.pointer = this.get(jumpTo,modes[1])
    else this.step(3)
  }
  jumpIfFalse(modes) {
    const [a,jumpTo] = this.getParams(2)
    if (this.get(a,modes[0])==0) this.pointer = this.get(jumpTo,modes[1])
    else this.step(3)
  }
  lessThan(modes) {
    const [a,b,out] = this.getParams(3)
    this.cells[out] = this.get(a,modes[0]) < this.get(b,modes[1]) ? 1 : 0
    this.step(4)
  }
  equals(modes) {
    const [a,b,out] = this.getParams(3)
    this.cells[out] = this.get(a,modes[0]) == this.get(b,modes[1]) ? 1 : 0
    this.step(4)
  }
  end() { this.halted = true }
  result() { return this.cells[0] }
}

module.exports = {Interpreter}
