const part1 = input => {
  const drops = input.split('\n').map(
    drop => drop.split(',').map(Number)
  )

  let sides = 0

  drops.forEach(
    drop => {
      drop.forEach(
        (pos,axis) => {
          if(!drops.find(_drop=>(
            [
              drop[0]+(0==axis?1:0),
              drop[1]+(1==axis?1:0),
              drop[2]+(2==axis?1:0)
            ].join(',')==_drop.join(',')
        ))) sides++
          if(!drops.find(_drop=>(
            [
              drop[0]-(0==axis?1:0),
              drop[1]-(1==axis?1:0),
              drop[2]-(2==axis?1:0)
            ].join(',')==_drop.join(',')
          ))) sides++
        }
      )
    }
  )

  return sides
}

module.exports = {part1}
