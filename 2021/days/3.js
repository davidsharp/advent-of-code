const countBits = input => input.map(num=>num.split(''))
  .reduce((acc,number)=>{
  number.forEach((digit,i)=>{
    if(!acc[i])acc[i]={'1':0,'0':0}
    acc[i][digit]++
  })
  return acc
},[])

const part1 = input => {
  const bitCount = countBits(input.split('\n'))
  const gamma = bitCount.map(digit=>digit['1']>digit['0']?'1':'0').join('')
  const epsilon = bitCount.map(digit=>digit['1']<digit['0']?'1':'0').join('')

  return parseInt(gamma,2) * parseInt(epsilon,2)
}

const part2 = input => {
  const numbers = input.split('\n')
  // life support = oxygen gen * co2 scrub

  let bit = 0
  let oxygenPool = numbers
  while(oxygenPool.length>1){
    let digit = countBits(oxygenPool)[bit]
    oxygenPool = oxygenPool.filter(
      num => num[bit]==(digit['1']>=digit['0']?'1':'0')
    )
    bit++
  }
  bit = 0
  let co2Pool = numbers
  while(co2Pool.length>1){
    let digit = countBits(co2Pool)[bit]
    co2Pool = co2Pool.filter(
      num => num[bit]==(digit['1']>=digit['0']?'0':'1')
    )
    bit++
  }

  return parseInt(oxygenPool,2) * parseInt(co2Pool,2)
}

module.exports = {part1, part2}