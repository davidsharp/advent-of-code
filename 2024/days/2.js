const parse = input => {
  return input.split('\n').map(l=>l.split(' ').map(Number))
}

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

const part1 = input => {
  const reports = parse(input)

  return reports.reduce((safeReports, report) => {
    const safe = checkReport(report)
    return safeReports += (safe?1:0)
  },0)
}

const part2 = input => {
  const reports = parse(input)

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
