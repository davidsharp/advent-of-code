const part1 = input => {
  const valves = input.split('\n').map(str => {
    let [v,t] = str.split(';')
    let f = Number(v.split('=').pop())
    v = v.split(' ')[1]
    t = t.split(/valves? /)[1].split(', ')

    return {key:v,tunnels:t,flow:f,open:false}
  }).reduce((a,c)=>({...a,[c.key]:c}),{})

  let seconds = 30
  let openValves = []
  let relievedPressure = 0
  let loc = 'AA'
  while(seconds-->0){
    console.log(30-seconds,loc)
    console.log(openValves.map(x=>[x.key,x.flow]))
    openValves.forEach(x=>relievedPressure+=x.flow)

    // move
    if(valves[loc].flow==0||valves[loc].open){
      // move to highest unopened
      const best = valves[loc].tunnels.map(
        x=>valves[x]
      ).sort((a,b)=>(
        a.open||b.open?(a.open||b.open):
        a.flow>b.flow?-1:1
      ))
      loc = best[0].key
      // or create path to highest overall unopened?
    } else {
      console.log('opening ',loc)
      openValves.push(valves[loc])
      valves[loc].open = true
    }
  }

  return relievedPressure
}

module.exports = {part1}
