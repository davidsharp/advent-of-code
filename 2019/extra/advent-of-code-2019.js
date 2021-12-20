// copy your input into clipboard then -> `pbpaste | node aoc-2019 [day]`

const days = {}

days[1]={
  part1: data=>data.split('\n').reduce((a,b)=>a+Math.floor(parseInt(b)/3)-2,0),
  part2: data=>data.split('\n').reduce((a,b)=>{
    const calcFuel = m => Math.floor(parseInt(m)/3)-2
    let total = 0
    let mass = b
    while(mass>0){
      const fuelMass = calcFuel(mass)
      if(fuelMass<=0)break;
      total+=fuelMass
      mass=fuelMass
    }
    return a+total
  },0)
}

days[2]={
  part1: data=>{
    let opcode = data.split(',').map(Number)
    opcode[1]=12
    opcode[2]=2
    let pos = 0
    const op = (f) => {
      if(f===99){pos=Infinity;return;}
      opcode[opcode[pos+3]]=(f===1?
        opcode[opcode[pos+1]]+opcode[opcode[pos+2]]:
        opcode[opcode[pos+1]]*opcode[opcode[pos+2]])
      pos+=4
    }
    while(pos<opcode.length)op(opcode[pos]);
    return opcode[0]
  },
  part2: data=>{
    const input = data.split(',').map(Number)
    const fn=(_data,_noun,_verb)=>{
      let opcode = _data
      opcode[1]=_noun
      opcode[2]=_verb
      let pos = 0
      const op = (f) => {
        if(f===99){pos=Infinity;return;}
        opcode[opcode[pos+3]]=(f===1?
          opcode[opcode[pos+1]]+opcode[opcode[pos+2]]:
          opcode[opcode[pos+1]]*opcode[opcode[pos+2]])
        pos+=4
      }
      while(pos<opcode.length)op(opcode[pos]);
      return opcode[0]
    }
    let upper=0;
    let lower=0;
    let flip=false;
    let output=undefined;
    const magic=19690720;
    do{
      if(flip)output=fn([...input],lower,upper);
      else{
        if(lower===upper){upper++;lower=0;}
        else lower++;
        output=fn([...input],upper,lower)
      }
      flip=!flip
    }while(output!=magic)
    return flip?(100*upper+lower):(100*lower+upper)
    /*
    //bonus solution: got my magic number wrong and was re-using a mutated array by mistake,
    //  re-writing from scratch helped me fix the above solution
    let noun=0;
    let verb=0;
    const magic=19690720;
    let output=undefined;
    while(noun<=99&&output!=magic){
      while(verb<=99&&output!=magic){
        output=fn([...input],noun,verb);
        if(output==magic)break;
        verb++;
      }
      if(output==magic)break;
      noun++;verb=0;
    }
    return output==magic?
      `100 * ${noun} (noun) + ${verb} (verb) = ${100*noun+verb}`
      :`failed: output is ${output} (noun: ${noun}, verb: ${verb})`
      */
  }
}

days[3]={
  part1: data=>{
    const [wireA, wireB] = data.split('\n').map(w=>w.split(','));
    const coords = wireA.reduce((o,i)=>{
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        set.add(`${pos.x},${pos.y}`)
      }
      return {pos:targetpos,set}
    },{pos:{x:0,y:0},set:new Set()}).set
    return wireB.reduce((o,i)=>{
      let manhattan=o.manhattan
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        if(coords.has(`${pos.x},${pos.y}`)){
          const x=Math.abs(pos.x)+Math.abs(pos.y)
          if(!manhattan||x<manhattan)manhattan=x
        }
      }
      return {pos:targetpos,manhattan}
    },{pos:{x:0,y:0},manhattan:null}).manhattan
  },
  part2: data=>{
    const [wireA, wireB] = data.split('\n').map(w=>w.split(','));
    const coords = wireA.reduce((o,i)=>{
      let steps=o.steps-1
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const map=o.map
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        steps++;
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        map.set(`${pos.x},${pos.y}`,steps)
      }
      return {pos:targetpos,map,steps}
    },{pos:{x:0,y:0},map:new Map(),steps:0}).map
    return wireB.reduce((o,i)=>{
      let steps=o.steps-1
      let minsteps=o.minsteps
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        steps++;
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        if(coords.has(`${pos.x},${pos.y}`)){
          const x=coords.get(`${pos.x},${pos.y}`)+steps
          if(!minsteps||x<minsteps)minsteps=x
        }
      }
      return {pos:targetpos,minsteps,steps}
    },{pos:{x:0,y:0},minsteps:null,steps:0}).minsteps
  }
}

days[4]={
  part1: data=>{
    const [min, max] = data.split('-').map(Number)
    let count=min
    let passcodes=[]
    while(count<=max){
      if(
        /(\d)\1/.test(count) && //same adj
        count==(''+count).split('').sort().join('')//doesn't decrease
      )passcodes.push(count);
      count++;
    }
    return passcodes.length
  },
  part2: data=>{ //requires Node 12+
    let [count, max] = data.split('-').map(Number)
    let passcodes=[]
    while(count<=max){
      if(
        //doesn't decrease
        count==(''+count).split('').sort().join('') &&
        //same adj, but discount groups larger than 2
        [...(''+count).matchAll(/(\d)\1+/g)].map(m=>m[0]).filter(m=>m.length==2).length>0
      )passcodes.push(count);
      count++;
    }
    return passcodes.length
  }
}

days[5]={
  //Misread the task, hence all the noisy logging
  part1: data=>{
    let opcode = data.split(',').map(Number)
    let input = 1
    let output = []
    let pos = 0
    const op = (f,iMode=[false,false,false]) => {
      console.log('function: ',f,', position: ',pos,', iMode: ',iMode)
      if(f===99){pos=Infinity;return;}
      if(f===1){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          +  (!iMode[1]?opcode[params[1]]:params[1])
        console.log('addition output:',opcode[params[2]])
        pos+=4
      }
      else if(f===2){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          *  (!iMode[1]?opcode[params[1]]:params[1])
        pos+=4
      }
      else if(f===3){
        const pointer = opcode[pos+1]
        console.log(f,pointer)
        opcode[pointer]=input
        pos+=2
      }
      else if(f===4){
        const pointer = opcode[pos+1]
        console.log(f,': opcode[',pointer,'] :',opcode[pointer])
        output.push(opcode[pointer])
        console.log(output)
        pos+=2
      }
      else {
        const inst = (''+f).padStart(5,'0');
        const o = Number(inst.slice(-2))
        op(o,inst.slice(0,-2).split('').reverse().map(n=>n==1))
      }
      console.log('~~~~~~')
    }
    while(pos<opcode.length)op(opcode[pos]);
    return output.pop()
  },
  part2: data=>{
    let opcode = data.split(',').map(Number)
    let input = 5
    let output = []
    let pos = 0
    const op = (f,iMode=[false,false,false]) => {
      console.log('function: ',f,', position: ',pos,', iMode: ',iMode)
      if(f===99){pos=Infinity;return;}
      if(f===1){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          +  (!iMode[1]?opcode[params[1]]:params[1])
        console.log('addition output:',opcode[params[2]])
        pos+=4
      }
      else if(f===2){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          *  (!iMode[1]?opcode[params[1]]:params[1])
        pos+=4
      }
      else if(f===3){
        const pointer = opcode[pos+1]
        console.log(f,pointer)
        opcode[pointer]=input
        pos+=2
      }
      else if(f===4){
        const pointer = opcode[pos+1]
        console.log(f,': opcode[',pointer,'] :',opcode[pointer])
        output.push(iMode[0]?pointer:opcode[pointer])
        console.log(output)
        pos+=2
      }
      else if(f===5){
        if((iMode[0]?opcode[pos+1]:opcode[opcode[pos+1]])!==0)
          pos=(iMode[1]?opcode[pos+2]:opcode[opcode[pos+2]])
        else pos+=3
      }
      else if(f===6){
        if((iMode[0]?opcode[pos+1]:opcode[opcode[pos+1]])===0)
          pos=(iMode[1]?opcode[pos+2]:opcode[opcode[pos+2]])
        else pos+=3
      }
      else if(f===7){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          <  (!iMode[1]?opcode[params[1]]:params[1])
          ? 1 : 0
        pos+=4
      }
      else if(f===8){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[params[2]]=
          (!iMode[0]?opcode[params[0]]:params[0])
          ==  (!iMode[1]?opcode[params[1]]:params[1])
          ? 1 : 0
        pos+=4
      }
      else {
        const inst = (''+f).padStart(5,'0');
        const o = Number(inst.slice(-2))
        op(o,inst.slice(0,-2).split('').reverse().map(n=>n==1))
      }
      console.log('~~~~~~')
    }
    while(pos<opcode.length)op(opcode[pos]);
    return output.pop()
  }
}

days[6]={
  part1: data=>{
    const orbitTree = data.split('\n').reduce((map,orbit)=>{
      const [a,b] = orbit.split(')')
      map.set(a,{
        parent:map.has(a)&&map.get(a).parent||undefined,
        children:[...(map.has(a)&&map.get(a).children||[]),b]
      })
      map.set(b,{
        parent:a,
        children:[...(map.has(b)&&map.get(b).children||[])]
      })
      return map
    },new Map())
    let root = null;
    orbitTree.forEach((v,k)=>{if(!root&&!v.parent)root=orbitTree.get(k)})
    let orbitCount = 0;
    const crawl = ({ children },depth=0) => {
      children.forEach(c=>crawl(orbitTree.get(c),depth+1))
      orbitCount+=depth
    }
    crawl(root)
    return orbitCount
  },
  part2: data=>{
    const orbitTree = data.split('\n').reduce((map,orbit)=>{
      const [a,b] = orbit.split(')')
      map.set(a,{
        parent:map.has(a)&&map.get(a).parent||undefined,
        children:[...(map.has(a)&&map.get(a).children||[]),b]
      })
      map.set(b,{
        parent:a,
        children:[...(map.has(b)&&map.get(b).children||[])]
      })
      return map
    },new Map())
    let me = null;
    let santa = null;
    orbitTree.forEach((v,k)=>{
      if(k=='YOU')me=orbitTree.get(k)
      if(k=='SAN')santa=orbitTree.get(k)
    })
    const crawl = ({ parent },route=[]) => {
      return parent?crawl(orbitTree.get(parent),[...route,parent]):route
    }
    let transfers = null;
    const myRoute = crawl(me)
    const santaRoute = crawl(santa)
    while(!santaRoute.find(r=>r===myRoute[0])){
      myRoute.shift();
      transfers++;
    }
    transfers+=santaRoute.findIndex(r=>r===myRoute[0])
    return transfers
  }
}

days[7]={ //incomplete solution
  part1:data=>{
    let inputs=0;
    const max = parseInt('44444',5)
    let highest = [0,0]
    while(inputs<=max){
      const inputArray = inputs.toString(5).padStart(5,'0').split('').map(Number)
      const A = days[7].thruster(data,[inputArray[0],0])
      const B = days[7].thruster(data,[inputArray[1],A])
      const C = days[7].thruster(data,[inputArray[2],B])
      const D = days[7].thruster(data,[inputArray[3],C])
      const E = days[7].thruster(data,[inputArray[4],D])
      if(E>highest[1])highest=[inputArray.join(),E]
      console.log(inputArray,[A,B,C,D,E])
      inputs++
    }
    return highest
  }
}

days[8]={
  part1:data=>{
    const height = 6;
    const width = 25;
    const pixels = data.split('');
    const layers=[]
    while(layers.length<(pixels.length/(height*width)))
      layers.push(pixels.slice(
        layers.length*height*width,
        (layers.length+1)*height*width)
      )
    const target = layers.reduce((a,b)=>{
      const zeros = (b.join('').split('0').length-1)
      return zeros>a.zeros?a:{zeros,layer:b}
    },{zeros:Infinity,layer:null}).layer
    return (target.join('').split('1').length-1) * (target.join('').split('2').length-1)
  },
  part2:data=>{
    const height = 6;
    const width = 25;
    const pixels = data.split('');
    const layers=[]
    while(layers.length<(pixels.length/(height*width)))
      layers.push(pixels.slice(
        layers.length*height*width,
        (layers.length+1)*height*width)
      )
    return layers.reduce((composite,layer)=>{
      if(!composite)return layer;
      return composite.map((c,i)=>(c!=2?c:layer[i]))
    },null)
    .reduce((a,b,i)=>(
      `${a}${(i%width==0?'\n':'')+b}`
    ),'').replace(/0/g,' ')
  }
}

days[9]={
  //also unfinished (and hacky as heck)
  part1: data=>{
    let opcode = data.split(',').map(Number)
    let input = 5
    let output = []
    let pos = 0
    let relative = 0
    const op = (f,iMode=[false,false,false],rMode=[false,false,false]) => {
      console.log('function: ',f,', position: ',pos,', iMode: ',iMode,', rMode: ',rMode,', relative: ',relative)
      if(f===99){pos=Infinity;return;}
      if(f===1){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[rMode[2]?params[2]+relative:params[2]]=
          (iMode[0]?params[0]:
           rMode[0]?opcode[relative+params[0]]:
           opcode[params[0]]||0)
          +  (iMode[1]?params[1]:
            rMode[1]?opcode[relative+params[1]]:
            opcode[params[1]]||0)
        console.log('addition output:',opcode[params[2]])
        pos+=4
      }
      else if(f===2){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[rMode[2]?params[2]+relative:params[2]]=
        (iMode[0]?params[0]:
          rMode[0]?opcode[relative+params[0]]:
          opcode[params[0]]||0)
         *  (iMode[1]?params[1]:
           rMode[1]?opcode[relative+params[1]]:
           opcode[params[1]]||0)
        pos+=4
      }
      else if(f===3){
        const pointer = opcode[pos+1]
        console.log(f,pointer)
        opcode[rMode[0]?relative+pointer:pointer||0]=input
        pos+=2
      }
      else if(f===4){
        const pointer = opcode[pos+1]
        console.log(f,': opcode[',rMode[0]?relative+pointer:pointer,'] :',opcode[rMode[0]?relative+pointer:pointer])
        output.push(
          iMode[0]?pointer:
          rMode[0]?opcode[relative+pointer]:
          opcode[pointer]||0
          )
        //console.log(output)
        pos+=2
      }
      else if(f===5){
        if((
          iMode[0]?opcode[pos+1]:
          rMode[0]?opcode[relative+opcode[pos+1]]:
          opcode[opcode[pos+1]]||0
          )!==0)
          pos=(
            iMode[1]?opcode[pos+2]:
            rMode[1]?opcode[relative+opcode[pos+2]]:
            opcode[opcode[pos+2]]||0
            )
        else pos+=3
      }
      else if(f===6){
        if((
          iMode[0]?opcode[pos+1]:
          rMode[0]?opcode[relative+opcode[pos+1]]:
          opcode[opcode[pos+1]]||0
          )===0)
          pos=(
            iMode[1]?opcode[pos+2]:
            rMode[1]?opcode[relative+opcode[pos+2]]:
            opcode[opcode[pos+2]]||0
            )
        else pos+=3
      }
      else if(f===7){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[rMode[2]?params[2]+relative:params[2]]=
          (iMode[0]?params[0]:
          rMode[0]?opcode[relative+params[0]]:
          opcode[params[0]]||0)
          <  (iMode[1]?params[1]:
           rMode[1]?opcode[relative+params[1]]:
           opcode[params[1]]||0)
          ? 1 : 0
        pos+=4
      }
      else if(f===8){
        const params=opcode.slice(pos+1,pos+4)
        console.log(f,params,iMode)
        opcode[rMode[2]?params[2]+relative:params[2]]=
          (iMode[0]?params[0]:
          rMode[0]?opcode[relative+params[0]]:
          opcode[params[0]]||0)
         ==  (iMode[1]?params[1]:
           rMode[1]?opcode[relative+params[1]]:
           opcode[params[1]]||0)
          ? 1 : 0
        pos+=4
      }
      else if(f===9){
        relative += iMode[0]?opcode[pos+1]:
          rMode[0]?opcode[opcode[pos+1]+relative]:
          opcode[opcode[pos+1]]||0
        pos+=2
      }
      else {
        const inst = (''+f).padStart(5,'0');
        const o = Number(inst.slice(-2))
        op(
          o,
          inst.slice(0,-2).split('').reverse().map(n=>n==1),
          inst.slice(0,-2).split('').reverse().map(n=>n==2)
        )
      }
      console.log('~~~~~~')
    }
    while(pos<opcode.length)op(opcode[pos]);
    return output//.pop()
  }
}

days[10]={
  part1:data=>{
    // this gives an array accessed like roids[y][x]
    //const roids = data.split('\n').map((row,y)=>row.split('').map())
    const roids = data.split('\n').reduce((a,row,y)=>{
      row.split('').forEach((c,x)=>{
        if(c=='#')a.push({x,y})
      })
      return a
    },[])
    return roids.map((roid)=>{
      const count = roids.reduce((count,r)=>{
        if(
          //not this asteroid
          !(r.x==roid.x &&
          r.y==roid.y) &&
          //not in the same path
          roids.findIndex(_r=>(
            // not the same direction
            (_r.x-roid.x)/(_r.y-roid.y) === (r.x-roid.x)/(r.y-roid.y) &&
            // unless it's the closest one
            (_r.x-roid.x<0?_r.x-roid.x>r.x-roid.x:_r.x-roid.x<r.x-roid.x)
          ))<0
        )count++;
        return count;
      },0)
      return {...roid, count}
    })
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