const part1 = input => {
  const outputs = input.replaceAll('|\n','| ').split('\n').map(x=>x.split(' | ')[1].split(' '))
  return outputs.flat().filter(o=>(
    o.length == 2 || //1
    o.length == 4 || //4
    o.length == 3 || //7
    o.length == 7    //8
  )).length
}

module.exports = {part1}
