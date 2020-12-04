const parse = input => input.split('\n\n').filter(x=>x).map(entry=>(
  Object.fromEntries(entry.split(/ |\n/).map(field=>field.split(':')))
))

const part1 = input => {
  const docs = parse(input)
  return docs.reduce(
    (count,doc)=>(Object.values(doc).length==8 || (Object.values(doc).length==7 && !doc.cid))?count+1:count
  ,0)
}
const part2 = input => parse(input).reduce(
    (count,doc)=>{
      if(!(Object.values(doc).length==8 || (Object.values(doc).length==7 && !doc.cid))) return count
      if(!(
        Number(doc.byr)>=1920&&Number(doc.byr)<=2002 &&
        Number(doc.iyr)>=2010&&Number(doc.iyr)<=2020 &&
        Number(doc.eyr)>=2020&&Number(doc.eyr)<=2030
      )) return count
      //if(/[0-9]+(cm|in)/.test(doc.hgt)) return count;
      const hgtV=/(\d+)(in|cm)/.exec(doc.hgt)
      if(!hgtV) return count
      const [,height,units]=hgtV
      if(!(
        (units=='cm' && Number(height)>=150 && Number(height)<=193)||
        (units=='in' && Number(height)>=59 && Number(height<=76))
      )) return count
      if(!(
        /#[0-9a-f]{6}/.test(doc.hcl) &&
        /amb|blu|brn|gry|grn|hzl|oth/.test(doc.ecl)
      )) return count
      if(!(
        doc.pid.length===9 && Number(doc.pid)
      )) return count
      return count+1
    }
,0)

module.exports = {part1,part2}

/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/