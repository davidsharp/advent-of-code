module.exports = {
  part1:data=>{
    // this gives an array accessed like roids[y][x]
    //const roids = data.split('\n').map((row,y)=>row.split('').map())
    const roids = data.split('\n').reduce((a,row,y)=>{
      row.split('').forEach((c,x)=>{
        if(c=='#')a.push({x,y})
      })
      return a
    },[])
    return roids.map((roid)=>{
      const count = roids.reduce((count,r)=>{
        if(
          //not this asteroid
          !(r.x==roid.x &&
          r.y==roid.y) &&
          //not in the same path
          roids.findIndex(_r=>(
            // not the same direction
            (_r.x-roid.x)/(_r.y-roid.y) === (r.x-roid.x)/(r.y-roid.y) &&
            // unless it's the closest one
            (_r.x-roid.x<0?_r.x-roid.x>r.x-roid.x:_r.x-roid.x<r.x-roid.x)
          ))<0
        )count++;
        return count;
      },0)
      return {...roid, count}
    })
  }
}