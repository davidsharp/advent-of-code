const parse = input => {
  return input.split('\n').slice(0,5).map(l=>l.split(' ').map(Number))
}

const part1 = input => {
  const reports = parse(input)

  return reports.reduce((safeReports, report) => {
    const {safe} = report.reduce(({safe, ascending}, level, i, levels) => {
      if(!safe) return {safe, ascending}
      if (i == 0) { ascending = levels[i+1] > level }
      else {
        const prev = levels[i-1]
        if (ascending) { safe = level > prev && level < prev + 4 }
        else { safe = level < prev && level > prev - 4 }
      }
      return {safe, ascending}
    },{safe:true,ascending:true})
    return safeReports += (safe?1:0)
  },0)
}

const part2 = input => {
  const reports = parse(input)

  return reports.reduce((safeReports, report) => {
    const {safe} = report.reduce(({safe, ascending, skip}, level, i, levels) => {
      if(!safe) return {safe, ascending}
      if (i == 0) { ascending = levels[i+1] > level }
      else {
        const prev = levels[i-(skip===i-1?2:1)]
        let tempSafe = true
        if (ascending) { tempSafe = level > prev && level < prev + 4 }
        else { tempSafe = level < prev && level > prev - 4 }
        if (!tempSafe && !skip) {
          safe = true
          skip = i
        }
        else { safe = tempSafe }
      }
      return {safe, ascending, skip}
    },{safe:true,ascending:true,skip:null})
    return safeReports += (safe?1:0)
  },0)
}

module.exports = { part1, part2 }
