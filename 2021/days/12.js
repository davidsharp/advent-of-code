const part1 = input => {
  const rooms = {}
  input.split('\n').forEach(path=>{
    const [f,t] = path.split('-')
    if(!rooms[f])rooms[f] = new Set()
    if(!rooms[t])rooms[t] = new Set()
    rooms[f].add(t)
    rooms[t].add(f)
  })
  //console.log(rooms)
  let i = 0
  let routes = [['start']]
  while(i<routes.length){
    // reversed arrays, for ease
    let location = routes[i][0]
    let deadEnd = false
    while(location!='end' && !deadEnd){
      const paths = [...rooms[location]].filter(
        path => !routes[i].includes(path) || isLarge(path)
      )
      if(paths.length == 0) deadEnd = true
      else {
        const [next,...other] = paths
        other.forEach(p=>{
          routes.push([p,...routes[i]])
        })
        routes[i].unshift(next)
      }
      location = routes[i][0]
    }
    i++
  }

  //console.log(routes.map(x=>x.reverse().join(',')))

  return routes.filter(route => route[0]=='end').length
}

const isLarge = key => key == key.toUpperCase()

module.exports = {part1}
