const part1 = input => {
  let init = input.split('\n').map((x,i)=>{
    return {
      val:Number(x),
      ind:i
    }
  })

  init.forEach(
    ({val,ind},i) => {
      //console.log(i,val,init.sort((a,b)=>a.ind>b.ind?1:-1))
      const newInd = (ind+val+init.length)%init.length
      init[i].ind = newInd
      console.log(val,': ',ind,'->',init[i].ind)
      init.forEach(({ind:_ind},ii)=>{
        if(i==ii)return;
        //out of range, uneffected
        if(_ind<newInd && _ind<ind);
        if(_ind>newInd && _ind>ind);

        if(_ind<=newInd && _ind>ind)init[ii].ind=(init[ii].ind-1+init.length%init.length);
        if(_ind>=newInd && _ind<ind)init[ii].ind=(init[ii].ind+1+init.length%init.length);
      })

      console.log(i,val,init.sort((a,b)=>a.ind>b.ind?1:-1))
      console.log('---')
    }
  )

  return init.sort((a,b)=>a.ind>b.ind?1:-1)
}

module.exports = {part1}
