module.exports = {
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