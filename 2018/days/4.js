module.exports = {
// could be tighter, but it works
part1: data=>{
  const timestamps = data.split('\n').sort()
  const guardsSleep = timestamps.reduce(
    (a,b)=>{
      const min = parseInt(b.match(/:\d\d/g)[0].substr(1))
      const cGuard = b.match(/#\d*/g)||a.temp.current
      const temp = {
        current:(cGuard?cGuard:a.temp.current),
        asleepAt:b.match(/fall/g)?parseInt(min):a.temp.asleepAt
      }
      let guard = {[cGuard]:(a[cGuard]||0)+((b.match(/wake/g))?(min-a.temp.asleepAt):0)}
      return {...a,...guard,temp}
    }
    ,{temp:{current:null}}
  )
  const target = Object.keys(guardsSleep).reduce((a,b)=>(b!='temp'?(!a||guardsSleep[b]>guardsSleep[a]?b:a):a),null)
  const minutesPerGuard = timestamps.join('\n').split('Guard #')
    .map(c=>c.split('\n')).filter(c=>c.length>1).map(shift=>{
      const guard = shift.shift().match(/\d+/g)
      if(!/(wake|fall)/.test(shift[shift.length-1]))shift.pop()
      return {guard, timestamps:shift}
    }).reduce((a,b)=>({...a,[b.guard]:[...(a[b.guard]||[]),...b.timestamps]}),{})
  const minutes = minutesPerGuard[target.substr(1)].reduce(
    (a,b)=>{
      const min = parseInt(b.match(/:\d\d/g)[0].substr(1))
      const arr = [...a]
      if(arr.length===0||arr[arr.length-1].length===2){
        arr.push([min])
      } else arr[arr.length-1].push(min)
      return arr
    }
    ,[]
  ).reduce(
    (a,b)=>a.map((c,i)=>c+(i>=b[0]&&i<b[1]?1:0))
    ,new Array(60).fill(0)
  ).reduce((a,b,i)=>(b>a[1]?[i,b]:a),[0,0])[0]
  return `${target.substr(1)}(guard) x ${minutes}(minute) = ${parseInt(target.substr(1))*minutes}`
},
part2: data=>{
  const timestamps = data.split('\n').sort()
  const minutesPerGuard = timestamps.join('\n').split('Guard #')
    .map(c=>c.split('\n')).filter(c=>c.length>1).map(shift=>{
      const guard = shift.shift().match(/\d+/g)
      if(!/(wake|fall)/.test(shift[shift.length-1]))shift.pop()
      return {guard, minutesAsleep:shift.reduce(
        (a,b)=>{
          const min = parseInt(b.match(/:\d\d/g)[0].substr(1))
          const arr = [...a]
          if(arr.length===0||arr[arr.length-1].length===2){
            arr.push([min])
          } else arr[arr.length-1].push(min)
          return arr
        }
        ,[]
      ).reduce(
        (a,b)=>a.map((c,i)=>c+(i>=b[0]&&i<b[1]?1:0))
        ,new Array(60).fill(0)
      )}
    }).reduce((a,b)=>({
      ...a,
      [b.guard]: b.minutesAsleep.reduce((c,d,i)=>{c[i]=c[i]+d;return c},(a[b.guard]||new Array(60).fill(0)))
    }),{})
    const guardWithMostCommonMinute = Object.keys(minutesPerGuard)
      .map(g=>[g,...minutesPerGuard[g].reduce((a,b,i)=>(b>a[1]?[i,b]:a),[0,0])])
      .reduce((a,b)=>(b[2]>a[2]?b:a),[0,0,0])
  return `${guardWithMostCommonMinute[0]}(guard) x ${guardWithMostCommonMinute[1]}(minute) = ${parseInt(guardWithMostCommonMinute[0])*guardWithMostCommonMinute[1]}`
}
}