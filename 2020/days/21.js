const parse = input => {
  return input.split('\n').map(food=>{
    let [ingredients,allergens] = food.split('(contains ').map(x=>x.match(/[a-z]+/g))
    return {ingredients,allergens}
  })
}

const part1 = input => {
  const allergens = {}
  let ingredients = new Set()
  const foods = parse(input)
  foods.forEach(food=>{
    ingredients = new Set([...ingredients,...food.ingredients])
    food.allergens.forEach((allergen) => {
      const ingredients = new Set(food.ingredients);
      if (allergen in allergens) {
        allergens[allergen] = new Set(
          [...allergens[allergen]].filter(x => ingredients.has(x))
        )
      }else{
        allergens[allergen] = ingredients;
      }
    });
    //console.log(food)
  })
  //console.log(ingredients)
  //console.log(allergens)
  let allergenIngreds = Object.values(allergens).reduce((a,b)=>new Set([...a,...b]),[])
  let safeIngredients = new Set(
    [...ingredients].filter(x => !allergenIngreds.has(x))
  )
  //console.log(safeIngredients)
  return foods.reduce((count,food)=>(
    count+food.ingredients.filter(ingr=>safeIngredients.has(ingr)).length
  ),0)
}


module.exports = {part1}