const {readFile} = require('fs/promises')

const thisYear = (new Date()).getFullYear()

// run
const run = async () => {
  const [day, year] = [process.argv[2], process.argv[3]||thisYear]
  let input;
  try{ input = await readFile(`./${year}/input/${day}.txt`,'utf8') }
  catch(e){/*fail silently*/}

  // by default, read from stdin
  const chunk = await readStdIn()
  if (chunk !== null) {
    if(chunk == '' || chunk == '\n') console.log('note: your pasted(?) input is empty')
    runDay(chunk, day, year)
  }
  // else use input if there is one
  else if(input) {
    runDay(input, day, year)
  }
  else {
    console.log(`No input data, either pipe input or create './${year}/input/${day}.txt'`)
  }

  // and exit once we're done
  process.exit(1)
}

const readStdIn = () => (new Promise(resolve=>{
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => resolve(process.stdin.read()))
  // resolve if there no immediate input
  // 5ms should be more than enough for the event
  setTimeout(()=>resolve(null),5)
}))

const runDay = (data,day,year=thisYear) => {
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

run()
