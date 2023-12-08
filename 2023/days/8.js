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
  let step = 0
  console.log(locations)
  while(!locations.reduce((notZ,loc)=>notZ&&/Z$/.test(loc),true)){
    locations = locations.map(
      location => instructions[step%instructions.length]=='L'?
        nodes[location].left:
        nodes[location].right
    )
    console.log(step,locations)
    step++
  }
  return step
}

module.exports = { /*part1,*/ part2 }
