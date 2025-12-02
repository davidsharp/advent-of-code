const part1 = input => input.split(',').reduce((acc,range) => {
  let [i,max] = range.split('-').map(Number)
  let idAcc = 0
  while (i <= max) {
    const id = i.toString()
    if (id.length % 2 == 0 && id.slice(0,id.length/2)==id.slice(id.length/2)) {
      idAcc += i
    }
    i++
  }
  return acc + idAcc
},0)

const primes = [2,3,5,7]
const part2 = input => input.split(',').reduce((acc,range) => {
  let [i,max] = range.split('-').map(Number)
  let idAcc = 0
  while (i <= max) {
    let invalid = false
    const id = i.toString()
    primes.forEach(p => {
      if (id.length % p == 0) {
        if(new RegExp(`(${id.slice(0,id.length/p)}){${p}}`).test(id)){
          invalid = true
        }
      }
    })
    if(invalid) idAcc += i
    i++
  }
  return acc + idAcc
},0)

module.exports = {part1,part2}
