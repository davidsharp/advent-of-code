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
const part1Tests = () => {
  let c = new Computer([0,0,9],[2,6])
  c.run()
  console.assert(c.registers.b == 1, 'test 1')
  c = new Computer([10,0,0],[5,0,5,1,5,4])
  c.run()
  console.assert(c.output.join(',') == '0,1,2', 'test 2')
  c = new Computer([2024,0,0],[0,1,5,4,3,0])
  c.run()
  console.assert(c.output.join(',') == '4,2,5,6,7,7,7,7,3,1,0', 'test 3a')
  console.assert(c.registers.a == 0, 'test 3b')
  c = new Computer([0,29,0],[1,7])
  c.run()
  console.assert(c.registers.b == 26, 'test 4')
  c = new Computer([0,2024,43690],[4,0])
  c.run()
  console.assert(c.registers.b == 44354, 'test 5')

  c = new Computer([729,0,0],[0,1,5,4,3,0])
  c.debug = true
  c.run()
  console.assert(c.output.join(',') == '4,6,3,5,6,3,5,2,1,0', 'example')
}
const part1 = input => {
  const [registers, instructions] = parse(input)
  //part1Tests()
  //console.log({registers,instructions})
  const comp = new Computer(registers,instructions)
  return comp.run().join(',')
}

module.exports = {part1}
