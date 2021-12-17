// run
const runDay = (data,day,year=2021) => {
  if(parseInt(day)){
    const dayO = require(`./${year}/days/${day}`)
    if(dayO){
      if(dayO.part1){
        console.log(`running day ${day} part 1`);
        runPart(dayO.part1,data)
      }
      if(dayO.part2){
        console.log(`running day ${day} part 2`);
        runPart(dayO.part2,data)
      }
      if(!(dayO.part1||dayO.part2)) console.log(`day ${day} has no exported solutions`)
    }
    else console.log('no solution for day '+day)
  } else console.log('no day specified')
}
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    runDay(chunk, process.argv[2])
  }
});

const { performance } = require('perf_hooks');

const runPart = (fn, data) => {
  const start = performance.now()
  const output = fn(data)
  const perf = performance.now()-start
  let [ms,fraction] = String(perf).split('.')
  fraction = fraction.slice(0,3)
  console.log('answer is :  ',output)
  console.log(`  ( took ${ms}.${fraction}ms )`)
  return output
}
