module.exports = {
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