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

  //console.log(routes.map(x=>[...x].reverse().join(',')))

  return routes.filter(route => route[0]=='end').length
}

const part2 = input => {
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
        path => {
          const visitedSmalls = routes[i].filter(r=>!isLarge(r))
          const hasBeenInSmallTwice = visitedSmalls.length != (new Set(visitedSmalls)).size
          return (
            path!='start' && (
              hasBeenInSmallTwice ?
              !routes[i].includes(path) :
              routes[i].filter(p=>p==path).length<2
            )
          ) || isLarge(path)
        }
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

  //console.log(routes.filter(r=>r[0]=='end').map(x=>[...x].reverse().join(',')))

  return routes.filter(route => route[0]=='end').length
}

const isLarge = key => key == key.toUpperCase()

module.exports = {part1,part2}
