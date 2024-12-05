const parse = input => {
  let [rules,updates] = input.split('\n\n').map(x=>x.split('\n').map(x=>x.split(/\||,/)))
  rules = rules.reduce((obj, [x,y]) => {
    if(!obj[x]) obj[x]=[]
    obj[x].push(y)
    return obj
  }, {})
  return {rules,updates}
}

const part1 = input => {
  const { rules, updates } = parse(input)
  return updates.reduce((acc, update) => {
    let correct = true
    for (let i = 0; i < update.length && correct; i++) {
      if (rules[update[i]]) {
        for (let y of rules[update[i]]) {
          // -1 is still correct
          let yIdx = update.indexOf(y)
          if (yIdx < i && yIdx > -1) correct = false;
        }
      }
    }
    return acc + (correct?Number(update[Math.floor(update.length/2)]):0)
  },0)
}

const part2 = input => {
  const { rules, updates } = parse(input)
  return updates.reduce((acc, update) => {
    let correct = true
    for (let i = 0; i < update.length && correct; i++) {
      if (rules[update[i]]) {
        for (let y of rules[update[i]]) {
          // -1 is still correct
          let yIdx = update.indexOf(y)
          if (yIdx < i && yIdx > -1) correct = false;
        }
      }
    }
    const reorderedUpdate = update.toSorted((a, b) => {
      if (rules[a]) {
        for (let y of rules[a]) {
          if(b==y) return 1
        }
      }
      // otherwise correct order
      return -1
    })
    return acc + (correct?0:Number(reorderedUpdate[Math.floor(update.length/2)]))
  },0)
}

module.exports = {part1, part2}
