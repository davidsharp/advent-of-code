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

module.exports = {part1}
