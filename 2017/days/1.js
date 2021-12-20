// Day 1 – 1
let inverseCaptcha = s => (
  s.split('').reduce((acc,c,i,a)=>(
    acc + (c===a[i<a.length-1?i+1:0]?parseInt(c):0)
  ),0)
)
// Day 1 – 2
let inverseCaptcha2 = s => {
  const seq = s.split('')
  const seqLength = seq.length
  const seqMid = seqLength/2
  return seq.reduce((acc,c,i)=>(
    //console.log(c,i,i+seqMid%seqLength,seq[(i+seqMid)%seqLength],seqMid,seqLength,c===seq[(i+seqMid)%seqLength]),
    acc + (
      c===seq[(i+seqMid)%seqLength]?
        parseInt(c):0)
  ),0)
}
// thoughts: I wonder if splitting into an array is any faster than using charAt

module.exports = {part1:inverseCaptcha,part2:inverseCaptcha2}
