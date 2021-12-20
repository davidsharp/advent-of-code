module.exports = {
  part1: data=>data.split('\n').reduce((a,b)=>a+((b[0]=='+'?1:-1)*parseInt(b.slice(1))),0),
  part2: data=>{
    const changes = data.split('\n')
    let value = 0
    let seen = new Set([0])
    let seenTwice = null
    let index = 0
    while(!seenTwice){
      const change = changes[index]
      value+=((change[0]=='+'?1:-1)*parseInt(change.slice(1)))
      index=(index+1)%changes.length
      if(seen.has(value))seenTwice = value
      seen.add(value)
    }

    return seenTwice
  }
}