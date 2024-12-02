const parse = input => {
  return input.split('\n').map(l=>l.split(' ').map(Number))
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

  const checkReport = report => {
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
    return safe
  }

  return reports.reduce((safeReports, report) => {
    let safe = checkReport(report)
    if (!safe) {
      for (let i = 0; !safe && i < report.length; i++) {
        if(checkReport([...report.slice(0,i),...report.slice(i+1)])) safe = true
      }
    }
    return safeReports += (safe?1:0)
  },0)
}

module.exports = { part1, part2 }

/*
const part2 = input => {
  const reports = parse(input)

  return reports.reduce((safeReports, report) => {
    const differences = report.map(level=>level[i+1]-level).slice(0,-1)
    let skips = 0
    for (let i = 0, j = 1; j < differences.length; i++, j++) {
      if (differences);
    }
  },0)
}
*/

/*
const part2 = input => {
  const reports = parse(input)

  return reports.reduce((safeReports, report) => {
    // filter out any very bad reports
    const directionCalc = report.map((level,i) => {
      return(
      report[i+1] < level ? -1 :
      report[i+1] > level ?  1 :
      0)
    }).slice(0, -1).reduce((acc, dir) => {
      if(dir == 1) acc.inc++
      else if(dir == -1) acc.dec++
      else acc.eq++
      return acc
    }, {inc:0,dec:0,eq:0})
    const ascending = directionCalc.inc > directionCalc.dec

    // wrong direction twice is bad
    let isBad = (directionCalc.inc > 1 && directionCalc.dec > 1) || directionCalc.eq > 1
    // wrong direction once and an equal is bad
    isBad = isBad || ((directionCalc.inc > 0 && directionCalc.dec > 0) && directionCalc.eq > 1)

    if(isBad)console.log(report, directionCalc)

    if(isBad) return false

    const {safe} = report.reduce(({safe, skip}, level, i, levels) => {
      if(!safe) return {safe, skip}
      const prev = levels[i-(skip===i-1?2:1)]
      if (prev) {
        let tempSafe = true
        if (ascending) { tempSafe = level > prev && level < prev + 4 }
        else { tempSafe = level < prev && level > prev - 4 }
        if (!tempSafe && skip < 0) {
          safe = true
          skip = i
        }
        else { safe = tempSafe }
      }
      return {safe, skip}
    },{safe:true,skip:-1})

    return safeReports += (safe?1:0)

  },0)
}
*/
