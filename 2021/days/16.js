const decodeHex = hex => hex.split('').map(
    h=>parseInt(h,16).toString(2).padStart(4,'0')
  ).join('')

const part1 = input => {
  const packet = /[2-9A-Z]/.test(input)?decodeHex(input):input
  return sumPacketVersion(packet,0).version
}
const part2 = input => {
  const packet = /[2-9A-Z]/.test(input)?decodeHex(input):input
  return parsePacket(packet,0).value
}

// for part1, returns version sum, and length
const sumPacketVersion = (packet,index) => {
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
        const {version,length} = sumPacketVersion(packet,readIndex)
        versionSum+=version
        readIndex+=length
      }
    }
    if(I=='1'){
      let subPacketCount = parseInt(packet.substr(readIndex+1,11),2)
      readIndex+=12
      while(subPacketCount-->0){
        const {version,length} = sumPacketVersion(packet,readIndex)
        versionSum+=version
        readIndex+=length
      }
    }
    return {version:version+versionSum,length:readIndex-index}
  }
}

// part2 - parsePacket returns packet contents, and length
const parsePacket = (packet,index) => {
  const version = parseInt(packet.substr(index,3),2)
  const typeID = parseInt(packet.substr(index+3,3),2)
  let readIndex = index+6

  if(typeID == 4){
    let packetEnded = false
    let output = []
    while(!packetEnded){
      if(packet[readIndex]=='0')packetEnded=true
      output.push(packet.substr(readIndex+1,4))
      readIndex+=5
    }
    return {value:parseInt(output.join(''),2),length:readIndex-index}
  }
  else{
    const I = packet[readIndex]
    let subPackets = []
    if(I=='0'){
      const bitLength = parseInt(packet.substr(readIndex+1,15),2)
      readIndex+=16
      const endOfSub = readIndex+bitLength
      while(readIndex<endOfSub){
        const {value,length} = parsePacket(packet,readIndex)
        subPackets.push(value)
        readIndex+=length
      }
    }
    if(I=='1'){
      let subPacketCount = parseInt(packet.substr(readIndex+1,11),2)
      readIndex+=12
      while(subPacketCount-->0){
        const {value,length} = parsePacket(packet,readIndex)
        subPackets.push(value)
        readIndex+=length
      }
    }
    const length = readIndex - index
    let value;
    if(typeID == 0)value = subPackets.reduce((a,b)=>a+b)
    if(typeID == 1)value = subPackets.reduce((a,b)=>a*b)
    if(typeID == 2)value = Math.min(...subPackets)
    if(typeID == 3)value = Math.max(...subPackets)
    if(typeID == 5)value = subPackets[0]>subPackets[1]?1:0
    if(typeID == 6)value = subPackets[0]<subPackets[1]?1:0
    if(typeID == 7)value = subPackets[0]==subPackets[1]?1:0
    return {value,length}
  }
}

module.exports = {part1,part2}
