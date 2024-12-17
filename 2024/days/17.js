class Computer {
  pointer = 0
  constructor(registers,program){
    const [a,b,c] = registers
    this.registers = {a,b,c}
    this.program = program
    this.output = []
  }
  run() {
    while (this.pointer < this.program.length) {
      const inst = this.instructions[this.program[this.pointer]]
      this[inst]()
    }
    return this.output
  }
  instructions = [
    'adv',
    'bxl',
    'bst',
    'jnz',
    'bxc',
    'out',
    'bdv',
    'cdv',
  ]
  combo(op) {
    if(op == 4) return this.registers.a
    if(op == 5) return this.registers.b
    if(op == 6) return this.registers.c
    else return op // and 7 never appears, right?
  }
  _dv(reg) {
    const op = this.program[this.pointer+1]
    this.registers[reg] = Math.trunc(
      this.registers.a /
      (2**this.combo(op))
    )
    this.pointer += 2
  }
  bxl() {
    const op = this.program[this.pointer+1]
    this.registers.b ^= op
    this.pointer += 2
  }
  bst() {
    const op = this.program[this.pointer+1]
    this.registers.b = this.combo(op) % 8
    this.pointer += 2
  }
  jnz() {
    if (this.registers.a == 0) this.pointer += 2
    else {
      const op = this.program[this.pointer+1]
      this.pointer = op
    }
  }
  bxc() {
    this.registers.b ^= this.registers.c
    this.pointer += 2
  }
  out() {
    const op = this.program[this.pointer+1]
    this.output.push(this.combo(op)%8)
    this.pointer+=2
  }
  adv() { this._dv('a') }
  bdv() { this._dv('b') }
  cdv() { this._dv('c') }
}
const parse = input => input.split('\n\n').map(x=>x.match(/\d+\b/g).map(Number))

const part1 = input => {
  const [registers, instructions] = parse(input)
  const comp = new Computer(registers,instructions)
  return comp.run().join(',')
}

const part2 = input => {
  const [registers, instructions] = parse(input)
  const [,b,c] = registers
  let a = 0
  let p
  while (p != instructions.join(',')) {
    console.log(a)
    const com = new Computer([a,b,c],instructions)
    p = com.run().join(',')
    a++
  }
  return a-1
}

module.exports = {part1,part2}
