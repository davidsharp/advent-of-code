// copy your input into clipboard then -> `pbpaste | node aoc-2018 [day]`

const days = {}

days[1]={
  part1: data=>data.split('\n').reduce((a,b)=>a+((b[0]=='+'?1:-1)*parseInt(b.slice(1))),0)
}

days[2]={
  // bleh
  part1: data => {
    const [twos,threes] = data.split('\n').reduce((a,b)=>{
      const str = [...b].sort().join('')
      const r4 = /([a-z])\1\1\1/i
      const r3 = /([a-z])\1\1/i
      const r2 = /([a-z])\1/i
      const fouredStr = str.replace(r4,'')
      const threedStr = str.replace(r3,'')
      return [
        a[0]+(r2.test(threedStr)?1:0),
        a[1]+(r3.test(fouredStr)?1:0)
      ]
    },
    [0,0])
    return twos*threes
  },
  // less bleh? oh, wait... a break statement...
  part2: data => {
    const makeMessyRegExp = s => {
      // like 'hrllo'.match(new RegExp('^(.{0}h.{4}|.{1}e.{3})$','g'))
      return s.split('').map((c,i,a)=>new RegExp(`^.{${i}}${c}.{${a.length-1-i}}$`,'g')
      )
    }
    let arr = data.split('\n')
    let regArr = arr.map(makeMessyRegExp)
    let similarStrings = []
    loop:
    for (let i=0;i<arr.length;i++) {
      const s = arr[i]
      for (let j=0;j<regArr.length;j++) {
        const r = regArr[j]
        const matches = r.map(c=>s.match(c)).filter(c=>c)
        if(matches.length===s.length-1){
          similarStrings = [arr[i],arr[j]]
          break loop;
        } // else console.log(matches.length,':::',arr[i],':::',arr[j])
      }
    }
    return similarStrings
  }
}

days[4]={
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

days[5]={
  part1: data=>{
    let noChange = true;
    let polymers = data;
    while(noChange){
      var reactedPolymers='';
      for(var i=0;i<polymers.length;i++){
        if(i!=polymers.length-1&&polymers[i].toUpperCase()==polymers[i+1].toUpperCase() && polymers[i]!=polymers[i+1]){
          //console.log('react -> ',polymers[i],polymers[i+1])
          i++; //skip and skip next
        }
        else {
          reactedPolymers = reactedPolymers + polymers[i]
        }
      }
      if(polymers.length===reactedPolymers.length) noChange=false
      polymers=reactedPolymers
    }
    return polymers.length
  },
  part2old: data=>{
    let shortest = data.length;
    'qwertyuiopasdfghjklzxcvbnm'.split('').map(c=>(new RegExp(c,'gi')))
    .forEach(c=>{const l = days[5].part1(data.replace(c,''));shortest=(l<shortest?l:shortest)})
    return shortest;
  },
  part2: data=>'qwertyuiopasdfghjklzxcvbnm'.split('').map(c=>(new RegExp(c,'gi')))
         .reduce((a,b)=>Math.min(a,days[5].part1(data.replace(b,''))),data.length)
}

days[9]={
  part1: data => {
    let [playerCount, lastMarble] = data.match(/\d+/g).map(x=>parseInt(x))
    let marbleToPlay=1; // first is implied
    let currentMarble={value:0};
    currentMarble.next=currentMarble;
    currentMarble.prev=currentMarble;
    let players=(new Array(playerCount)).fill(0);
    while(marbleToPlay<=lastMarble){
      //console.log(currentMarble)
      if((marbleToPlay%23)!=0){
        const newMarble={value:marbleToPlay,next:currentMarble.next.next,prev:currentMarble.next}
        currentMarble.next.next.prev = newMarble
        currentMarble.next.next = newMarble
        currentMarble = newMarble
      }
      else{
        const removedMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev
        removedMarble.prev.next=removedMarble.next
        removedMarble.next.prev=removedMarble.prev
        players[marbleToPlay%players.length] += (marbleToPlay+removedMarble.value)
        currentMarble = removedMarble.next
      }
      marbleToPlay++
    }
    return Math.max(...players)
  },
  part2: data => {
    let [playerCount, lastMarble] = data.match(/\d+/g).map(x=>parseInt(x))
    return days[9].part1([playerCount,lastMarble*100].join(','))
  }
}

days[10]={
  part1: _=>console.log('part 1 and 2 have the same output, see below for output')
  part2: data=>{
    console.log('probably best to pipe this into less')
    const stars = data.split('\n').map(
      s=>s.match(/-?\d*,( )+-?\d*/g).map(v=>v.split(',').map(_=>parseInt(_)))
    ) // array of stars, with format [position],[velocity]
    const print = (positions, dimensions, seconds) => {
      const field = (new Array(dimensions[1])).fill(null).map(_=>(new Array(dimensions[0])).fill('.'))
      positions.forEach(c=>{
        if(field[c[1]-1]&&field[c[1]-1][c[0]-1])
          field[c[1]-1][c[0]-1]='#'
      })
      return '\n~~~ second: '+seconds+' vvv\n'+field.map(c=>c.join('')).join('\n')
    }
    const positionAtSecond = (star, second) => (
      [
        star[0][0]+(star[1][0]*second),
        star[0][1]+(star[1][1]*second)
      ]
    )
    const calcDimensions = (stars, second) => stars.reduce((a,_b)=>{
      const b = positionAtSecond(_b,second)
      return !a?[b[0],b[0],b[1],b[1]]:(
      //[x1,x2,y1,y2]
      [
        Math.min(a[0],b[0]),
        Math.max(a[1],b[0]),
        Math.min(a[2],b[1]),
        Math.max(a[3],b[1])
      ]
    )},null)
    const dim = calcDimensions(stars, 0)
    let width=dim[1]-dim[0]; let height=dim[3]-dim[2];
    let offsetX=-dim[0]; let offsetY=-dim[2];
    let bigString=''; let seconds=0;
    while(width>=stars.length||height>=stars.length){
      let dim = calcDimensions(stars,seconds++)
      width=dim[1]-dim[0]; height=dim[3]-dim[2];
      offsetX=-dim[0]; offsetY=-dim[2];
    }
    while(width<=stars.length&&height<=stars.length){
      let dim = calcDimensions(stars,seconds++)
      width=dim[1]-dim[0]; height=dim[3]-dim[2];
      offsetX=-dim[0]; offsetY=-dim[2];
      const starsNow = stars.map(s=>positionAtSecond(s,seconds))
      bigString=bigString+print(starsNow.map(s=>[s[0]+offsetX,s[1]+offsetY]),[width,height],seconds)
    }
    return bigString
  }
}

days[13]={
  //works with test input, but not my actual input yet
  part1:data=>{
    const tracks = data.replace(/v|\^/,'|').replace(/<|>/,'-').split('\n')
    const carts = data.split('\n').reduce((a,track,y)=>{
      const re = /\^|v|<|>/g
      let cart = null
      while(cart = re.exec(track,re.lastIndex)){
        a.push({direction:cart[0],x:cart.index,y,turn:0})
      }
      return a
    },[])
    let crash = null;
    const turn = (d,t) => {
      const s='^>v<'
      return s[(s.length+s.indexOf(d)-1+(t%3))%s.length]
    }
    while(!crash){
      carts.sort((a,b)=>{a.x===b.x?a.x>b.x:a.y>b.y})
      carts.forEach(
        c=>{
          let t=null
          switch(c.direction){
            case '>':
              c.x+=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='v';
              else if(t=='/')c.direction='^';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case 'v':
              c.y+=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='>';
              else if(t=='/')c.direction='<';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case '<':
              c.x-=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='^';
              else if(t=='/')c.direction='v';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case '^':
              c.y-=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='<';
              else if(t=='/')c.direction='>';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
          }
          //check collision
          crash = carts.filter(_c=>_c.x===c.x&&_c.y===c.y).length>1?[c.x,c.y]:null
        }
      )
    }
    return crash
  }
}

// run
const runDay = (data,day) => {
  if(parseInt(day)){
    const dayO = days[parseInt(day)]
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
