module.exports = {
  //works with test input, but not my actual input yet
  part1:data=>{
    const tracks = data.replace(/v|\^/,'|').replace(/<|>/,'-').split('\n')
    const carts = data.split('\n').reduce((a,track,y)=>{
      const re = /\^|v|<|>/g
      let cart = null
      while(cart = re.exec(track,re.lastIndex)){
        a.push({direction:cart[0],x:cart.index,y,turn:0})
      }
      return a
    },[])
    let crash = null;
    const turn = (d,t) => {
      const s='^>v<'
      return s[(s.length+s.indexOf(d)-1+(t%3))%s.length]
    }
    while(!crash){
      carts.sort((a,b)=>{a.x===b.x?a.x>b.x:a.y>b.y})
      carts.forEach(
        c=>{
          let t=null
          switch(c.direction){
            case '>':
              c.x+=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='v';
              else if(t=='/')c.direction='^';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case 'v':
              c.y+=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='>';
              else if(t=='/')c.direction='<';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case '<':
              c.x-=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='^';
              else if(t=='/')c.direction='v';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
              break;
            case '^':
              c.y-=1
              t = tracks[c.y][c.x]
              if(t=='\\')c.direction='<';
              else if(t=='/')c.direction='>';
              else if(t=='+'){
                c.direction=turn(c.direction,c.turn)
                c.turn++
              }
          }
          //check collision
          crash = carts.filter(_c=>_c.x===c.x&&_c.y===c.y).length>1?[c.x,c.y]:null
        }
      )
    }
    return crash
  }
}