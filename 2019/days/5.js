module.exports = {
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