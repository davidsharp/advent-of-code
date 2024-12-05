const {Interpreter} = require('../utils/intcode')

const part1 = input => {
  const int = new Interpreter(input)
  int.poke(1,12)
  int.poke(2,2)
  int.run()
  return int.result()
}

const part2 = input => {
  const fn=(data,noun,verb)=>{
    const int = new Interpreter(data)
    int.poke(1,noun)
    int.poke(2,verb)
    int.run()
    return int.result()
  }
  let upper=0;
  let lower=0;
  let flip=false;
  let output=undefined;
  const magic=19690720;
  do{
    if(flip)output=fn(input,lower,upper);
    else{
      if(lower===upper){upper++;lower=0;}
      else lower++;
      output=fn(input,upper,lower)
    }
    flip=!flip
  }while(output!=magic)
  return flip?(100*upper+lower):(100*lower+upper)
}

module.exports = {part1, part2}
