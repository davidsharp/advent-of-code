const decodeHex = hex => hex.split('').map(
    h=>parseInt(h,16).toString(2).padStart(4,'0')
  ).join('')

const part1 = input => {
  const packet = /[2-9A-Z]/.test(input)?decodeHex(input):input
  console.log(packet)
  return parsePacket(packet,0).version
}

// for part1, returns version sum, and length
// part2? parsePacket returns packet contents, and length
const parsePacket = (packet,index) => {
  const version = parseInt(packet.substr(index,3),2)
  const typeID = parseInt(packet.substr(index+3,3),2)
  let readIndex = index+6

  let versionSum = 0

  if(typeID == 4){
    let packetEnded = false
    while(!packetEnded){
      if(packet[readIndex]=='0')packetEnded=true
      readIndex+=5
    }
    return {version,length:readIndex-index}
  }
  else{
    const I = packet[readIndex]
    if(I=='0'){
      const bitLength = parseInt(packet.substr(readIndex+1,15),2)
      readIndex+=16
      const endOfSub = readIndex+bitLength
      while(readIndex<endOfSub){
        const {version,length} = parsePacket(packet,readIndex)
        versionSum+=version
        readIndex+=length
      }
    }
    if(I=='1'){
      let subPacketCount = parseInt(packet.substr(readIndex+1,11),2)
      readIndex+=12
      while(subPacketCount-->0){
        const {version,length} = parsePacket(packet,readIndex)
        versionSum+=version
        readIndex+=length
      }
    }
    return {version:version+versionSum,length:readIndex-index}
  }

  /*
  // outputs literal value (type 4)
  let output = []
  let packetEnded = false
  while(!packetEnded){
    if(packet[readIndex]=='0')packetEnded=true
    output.push(packet.substr(readIndex+1,4))
    readIndex+=5
  }
  return parseInt(output.join(''),2)
  */
}

module.exports = {part1}
