module.exports = { //incomplete solution
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