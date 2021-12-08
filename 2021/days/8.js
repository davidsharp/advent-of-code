const part1 = input => {
  const outputs = input.replaceAll('|\n','| ').split('\n').map(x=>x.split(' | ')[1].split(' '))
  return outputs.flat().filter(o=>(
    o.length == 2 || //1
    o.length == 4 || //4
    o.length == 3 || //7
    o.length == 7    //8
  )).length
}

const part2 = input => {
  // replaceAll just for example input
  const panels = input.replaceAll('|\n','| ').split('\n')
    .map(x=>x.split(' | ')
      .map(x=>x.split(' ')
        .map(y=>y.split('').sort().join('')
    )))
  return panels.reduce((acc,panel)=>acc+Number(decode(panel)),0)
}

const decode = panel => {
  const [digits, display] = panel
  const characters = {
    1:digits.find(d=>d.length == 2),
    4:digits.find(d=>d.length == 4),
    7:digits.find(d=>d.length == 3),
    8:digits.find(d=>d.length == 7),
  }

  // get 0, 6 and 9
  const _069 = digits.filter(d=>d.length == 6)
  // 6 will be missing half of 1
  characters[6] = _069.find(d=>{
    const one = characters[1].split('')
    return d.indexOf(one[0])==-1 || d.indexOf(one[1])==-1
  })
  // get 2, 3 and 5
  const _235 = digits.filter(d=>d.length == 5)
  // 5 will almost match 6
  characters[5] = _235.find(d=>{
    return characters[6].split('').filter(x=>d.indexOf(x)==-1).length==1
  })

  // 9 is like 5 + 1
  characters[9] = _069.find(d=>{
    return d == [...new Set([
      ...characters[5].split(''),
      ...characters[1].split('')
    ])].sort().join('')
  })

  // 0 is not 6 or 9
  characters[0] = _069.find(d=>d!=characters[6]&&d!=characters[9])

  // 2 will also be missing half of 1, and not be 5
  characters[2] = _235.find(d=>{
    const one = characters[1].split('')
    return d!=characters[5] && (d.indexOf(one[0])==-1 || d.indexOf(one[1])==-1)
  })

  // 3 is not 2 or 5
  characters[3] = _235.find(d=>d!=characters[2]&&d!=characters[5])

  const array = Object.entries(characters).sort((a,b)=>a[0]-b[0]).map(x=>x[1])
  const reading = display.reduce((acc,c)=>`${acc}${array.indexOf(c)}`,'')

  return reading
}

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

 lengths:
  0 -> 6
  1 -> 2
  2 -> 5
  3 -> 5
  4 -> 4
  5 -> 5
  6 -> 6
  7 -> 3
  8 -> 7
  9 -> 6
*/

module.exports = {part1,part2}
