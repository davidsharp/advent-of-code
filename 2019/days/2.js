module.exports = {
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