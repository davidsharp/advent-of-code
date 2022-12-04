const part1 = input => input.split('\n').map(
  pair => {
    // pair of elves like: [[start,end],[start,end]]
    pair = pair.split(',').map(e => e.split('-').map(Number)).sort(
      // sorting so longest is first
      (a,b) => a[1]-a[0]>b[1]-b[0]?-1:1
    )
    return pair[0][0]<=pair[1][0] && pair[0][1]>=pair[1][1]
  }
).reduce((a,c)=>c?a+1:a,0)

const part2 = input => input.split('\n').map(
  pair => {
    pair = pair.split(',').map(e => e.split('-').map(Number)).sort(
      // sorting so earliest is first
      (a,b) => a[0]>b[0]?1:-1
    )
    return pair[0][1]>=pair[1][0]
  }
).reduce((a,c)=>c?a+1:a,0)

module.exports = {part1, part2}
