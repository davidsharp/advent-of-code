class Computer {
  pointer = 0n
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
    const op = this.program[this.pointer+1n]
    this.registers[reg] = (
      this.registers.a /
      (2n**this.combo(op))
    )
    this.pointer += 2n
  }
  bxl() {
    const op = this.program[this.pointer+1n]
    this.registers.b = this.registers.b ^ op
    this.pointer += 2n
  }
  bst() {
    const op = this.program[this.pointer+1n]
    this.registers.b = this.combo(op) % 8n
    this.pointer += 2n
  }
  jnz() {
    if (this.registers.a == 0) this.pointer += 2n
    else {
      const op = this.program[this.pointer+1n]
      this.pointer = op
    }
  }
  bxc() {
    this.registers.b = this.registers.b ^ this.registers.c
    this.pointer += 2n
  }
  out() {
    const op = this.program[this.pointer+1n]
    this.output.push(this.combo(op)%8n)
    this.pointer+=2n
  }
  adv() { this._dv('a') }
  bdv() { this._dv('b') }
  cdv() { this._dv('c') }
}
const parse = input => input.split('\n\n').map(x=>x.match(/\d+\b/g).map(BigInt))

const part1 = input => {
  const [registers, instructions] = parse(input)
  const comp = new Computer(registers,instructions)
  return comp.run().join(',')
}

let answers = []
const part2 = input => {
  // reverse engineer my input?
  const [registers, instructions] = parse(input)
  solve(instructions)
  return answers.sort()[0].toString()
}
const solve = (instructions,a = 0n,i=0) => {
  a = a << 3n
  for (let x = 0; x < 8; x++) {
    const com = new Computer([a+BigInt(x),0n,0n],instructions)
    com.run()
    if (
      com.output[0] == instructions[0] &&
      com.output.length == instructions.length
    ) {
      answers.push(a+BigInt(x))
    }
    if (com.output.shift() === instructions[instructions.length-(1+i)]) {
      solve(instructions,a+BigInt(x),i+1)
    }
  }
}

module.exports = {part1,part2}
