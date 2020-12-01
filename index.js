// run
const runDay = (data,day) => {
  if(parseInt(day)){
    const dayO = require(`./days/${parseInt(day)}`)
    if(dayO){
      if(dayO.part1){console.log(`running day ${day} part 1`);console.log('answer is :  ',dayO.part1(data))}
      if(dayO.part2){console.log(`running day ${day} part 2`);console.log('answer is :  ',dayO.part2(data))}
    }
    else console.log('no solution for day '+day)
  } else console.log('no day specified')
}
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    runDay(chunk, process.argv.slice(-1)[0])
  }
});