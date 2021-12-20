// Day 3 – 1
let spiralStepCount = n => {
  let width=1,layers=0;
  while(n>(width*width)){width+=2;layers++}
  
  let inner=width!==1?(width-2)*(width-2):1
  let outer=width*width
  let cornerDist=width-1

  let corners = [
    outer,
    outer-(cornerDist),
    outer-(cornerDist*2),
    inner+(cornerDist),
    inner //technically not, but useful for calc
  ]

  let side = corners.reduce((acc,c,i,a)=>(acc||(n<c&&n>a[i+1]?([c,a[i+1]]):(n===c?[c]:null))),null)

  // if we only have one corner the value is a corner
  if(side.length===1) return layers+(cornerDist/2);
  else return layers+( (cornerDist/2) - (side[0]-n<n-side[1]?side[0]-n:n-side[1]) )
}
// Day 3 – 2
let spiralStepCount2 = n => {
let width=1,layers=0;
while(n>(width*width)){width+=2;layers++}

let inner=width!==1?(width-2)*(width-2):1
let outer=width*width
let cornerDist=width-1

let innerLayer = [{values:[1],length:1}],outerLayer = {values:[],length:0};

/*
  Side goes from 1 to C, C being a corner
  corners are length of a side - 1, or a total layer / 4

    C|5|4|3|2|1|C
    1|C|3|2|1|C|5
    2|1|C|1|C|3|4
    3|2|1|1|1|2|3   starts in the middle, goes right and up
    4|3|C|1|C|1|2
    5|C|1|2|3|C|1
    C|1|2|3|4|5|C... continues from here (with a 1, then goes up)
*/

const isCorner=(index,sideLength)=>(!(sideLength%index))
const sideIndex=(index,sideLength)=>Math.floor(index/sideLength)

let corners = [
  outer,
  outer-(cornerDist),
  outer-(cornerDist*2),
  inner+(cornerDist),
  inner //technically not, but useful for calc
]

let side = corners.reduce((acc,c,i,a)=>(acc||(n<c&&n>a[i+1]?([c,a[i+1]]):(n===c?[c]:null))),null)

// if we only have one corner the value is a corner
if(side.length===1) return layers+(cornerDist/2);
else return layers+( (cornerDist/2) - (side[0]-n<n-side[1]?side[0]-n:n-side[1]) )
}
const createLayer = length => ({values:[],length:length,corners:[],width:0,cornerDist:0})
// thoughts: initially this had gross loops incrementing round, but then I figured I should do some maths

module.exports = {part1:spiralStepCount,part2:spiralStepCount2}
