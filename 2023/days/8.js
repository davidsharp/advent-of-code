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

const part2 = input => {
  let [instructions,nodes] = input.split('\n\n')
  nodes = nodes.split('\n').reduce(
    (obj,line) => {
      const [key, left, right] = line.split(/\W+/)
      obj[key] = {left,right}
      return obj
    }
  ,{})
  let locations = Object.keys(nodes).filter(x=>/A$/.test(x))
  let steps = locations.map(start => {
    let location = start
    let step = 0
    while(!/Z$/.test(location)){
      location = instructions[step%instructions.length]=='L'?
        nodes[location].left:
        nodes[location].right
      step++
    }
    return step
  })
  let smallest = steps.sort()[0]
  let num = smallest
  while(!steps.reduce((a,b)=>a&&(num%b==0),true))
    num+=smallest
  return num
}

module.exports = { part1, part2 }
