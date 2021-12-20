module.exports = {
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