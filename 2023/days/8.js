const part1 = input => {
  let [instructions,nodes] = input.split('\n\n')
  nodes = nodes.split('\n').reduce(
    (obj,line) => {
      const [key, left, right] = line.split(/\W+/)
      obj[key] = {left,right}
      return obj
    }
  ,{})
  let location = 'AAA'
  let step = 0
  while(location!='ZZZ'){
    location = instructions[step%instructions.length]=='L'?
      nodes[location].left:
      nodes[location].right
    step++
  }
  return step
}

module.exports = { part1 }
