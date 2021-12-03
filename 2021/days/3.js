const part1 = input => {
  const numbers  = input.split('\n').map(num=>num.split(''))

  const bitCount = numbers.reduce((acc,number)=>{
    number.forEach((digit,i)=>{
      if(!acc[i])acc[i]={'1':0,'0':0}
      acc[i][digit]++
    })
    return acc
  },[])
  
  const gamma = bitCount.map(digit=>digit['1']>digit['0']?'1':'0').join('')
  const epsilon = bitCount.map(digit=>digit['1']<digit['0']?'1':'0').join('')

  return parseInt(gamma,2) * parseInt(epsilon,2)

}

module.exports = {part1}