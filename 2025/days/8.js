const parse = input => input.split('\n').map(x=>x.split(',').map(Number))
const d = (a, b) => Math.sqrt(
  ((a[0]-b[0])**2) +
  ((a[1]-b[1])**2) +
  ((a[2]-b[2])**2)
)

const part1 = input => {
  const jBoxes = parse(input)
  const max_con = 1000
  const connex = []
  for (let i = 0; i < jBoxes.length; i++) {
    const c = jBoxes[i]
    for (let j = i + 1; j < jBoxes.length ;j++) {
      const cc = jBoxes[j]
      const dist = d(c,cc)
      if (connex.length < max_con) connex.push([Math.floor(dist), i, j])
      else {
        if(dist < connex[connex.length-1][0]) {
          connex.push([Math.floor(dist),i,j])
          connex.sort((a,b)=>a[0]-b[0])
          connex.pop()
        }
      }
    }
  }
  let circuits = connex.reduce((circuits,[_,a,b]) => {
    const matching_circuit = circuits.find(
      circuit => circuit.has(a) || circuit.has(b)
    )
    if (matching_circuit) {
      matching_circuit.add(a)
      matching_circuit.add(b)
    }
    else {
      circuits.push(new Set([a,b]))
    }
    return circuits
  }, [])
  let didIntersect=true
  while(didIntersect) {
    didIntersect = false
    let merged = []
    for (let i in circuits) {
      const circuit = circuits[i]
      if (merged.length) {
        const intersectsAt = merged.findIndex(
          _circuit => circuit.intersection(_circuit).size > 0
        )
        if (intersectsAt > -1 && intersectsAt != i) {
          merged[intersectsAt] = circuit.union(merged[intersectsAt])
        }
        else merged.push(circuit)
      }
      else merged.push(circuit)
    }
    didIntersect = circuits.length != merged.length
    circuits = merged
  }
  return circuits.map(a=>a.size).toSorted((a,b)=>b-a).slice(0,3).reduce((a,b)=>a*b)
}

const part2 = input => {
  const jBoxes = parse(input)
  const connex = []
  const connectedNodes = new Set()
  for (let i = 0; i < jBoxes.length; i++) {
    const c = jBoxes[i]
    for (let j = i + 1; j < jBoxes.length ;j++) {
      const cc = jBoxes[j]
      const dist = d(c,cc)
      connex.push([Math.floor(dist), i, j])
    }
  }
  connex.sort(([dist_a],[dist_b])=>dist_a-dist_b)
  let i = 0
  let last = []
  while (connectedNodes.size != jBoxes.length) {
    connectedNodes.add(connex[i][1])
    connectedNodes.add(connex[i][2])
    last = connex[i]
    i++
  }
  const [_,a,b] = last
  return jBoxes[a][0] * jBoxes[b][0]
}

module.exports = {part1,part2}
