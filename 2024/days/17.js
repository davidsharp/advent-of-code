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

const part2 = input => {
  // reverse engineer my input?
  const [registers, instructions] = parse(input)
  console.log(instructions)
  const x = instructions.toReversed().reduce((a, target, i) => {
    console.log(a.toString(8).padStart(i,0))
    a = a << 3n
    for (let i = 0n; i < 8n; i++) {
      let b = i
      b=b^2n
      let c=(a+i)/(2n**b)
      b=b^3n
      b=b^c
      if(b==target){
        console.log(`${target} hit!: ${i.toString(2)}`)
        return a + i
      }
    }
    return a //?
  },0n)
  console.log(x)
  const com = new Computer([x,0,0],instructions)
  com.run()
  return [com.output,instructions]
}

module.exports = {part1,part2}

/*
const x = instructions.toReversed().reduce((a, target, i) => {
  console.log(a.toString(8).padStart(i,0))
  a = a << 3n
  for (let i = 0n; i < 8n; i++) {
    let b = i
    b=b^2n
    let c=(a+i)/(2n**b)
    b=b^3n
    b=b^c
    if(b==target){
      console.log(`${target} hit!: ${i.toString(2)}`)
      return a + i
    }
  }
  return a //?
},0n)
*/
