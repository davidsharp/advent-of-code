// used in 2, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25

class Interpreter {
  halted = false
  pointer = 0
  cells = [] // {}?
  instructions = {
    1: 'add',
    2: 'mult',
    99: 'end',
  }
  constructor(input) { this.cells = input.split(',').map(Number) }
  run() { while (!this.halted) {
    const instruction = this.instructions[this.cells[this.pointer]]
    this[instruction]()
  } }
  step(x=1) {
    this.pointer += x
    if (this.pointer > this.cells.length) {
      this.halted = true
    }
  }
  poke(idx,value) { this.cells[idx] = value }
  add() {
    const [a,b,out] = this.cells.slice(this.pointer+1,this.pointer+4)
    this.cells[out] = this.cells[a] + this.cells[b]
    this.step(4)
  }
  mult() {
    const [a,b,out] = this.cells.slice(this.pointer+1,this.pointer+4)
    this.cells[out] = this.cells[a] * this.cells[b]
    this.step(4)
  }
  end() { this.halted = true }
  result() { return this.cells[0] }
}

module.exports = {Interpreter}
