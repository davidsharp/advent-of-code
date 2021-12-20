module.exports = {
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