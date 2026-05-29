/** @typedef {{
 *    item: string
 *    action: "sell" | "mail"
 *    target?: string | undefined
 *    arg: string
 *    keep?: number | undefined
 * }} QuickAction */


/** @type {Record<string, QuickAction>} */
export const DEFAULT_QUICK_ACTIONS = {}

/**
 * Register a default quick action.
 * @param {QuickAction[]} actions
 */
const initialize = (actions) => {
  for(const action of actions) {
    DEFAULT_QUICK_ACTIONS[action.item] = action
  }
}

const mailItemsToInit = {
  // Hourly
  "Minnows": "Cpt Thomas",
  // Daily
  "Eggs": "Star",
  "Feathers": "Star",
  "Milk": "Mariya",
  // Crafting
  "Bucket": "frank",
  "Wooden Box": "Vincent",
  "Hammer": "ROOMBA",
  "Axe": "Vincent",
  "Shovel": "Vincent",
  "Leather Diary": "Mariya",
  "Green Dye": "Rosalie",
  "Purple Dye": "Rosalie",
  "Blue Dye": "Rosalie",
  "Red Dye": "Rosalie",
  "Ruby Ring": "Rosalie",
  "Garnet Ring": "Rosalie",
  "Linked Lantern": "Star",
  "Essence of Slime": "Goo",
  "Green Butterfly": "Goo",
  // Boostable crops
  "Carrot": "frank",
  "Cucumber": "Mariya",
  "Eggplant": "Mariya",
  "Cabbage": "frank",
  // Fishing, by zone
  "Yellow Perch": "Geist",
  "Green Chromis": "Geist",
  "Blue Crab": "Cpt Thomas",
  "Stingray": "Geist",
  "Sporefly": "Goo",
  "Mini Slime Squid": "Goo",
  "Gold Slimeback": "Goo",
  "Slime Egg Shell": "Goo",
  // Exploring, by zone
  "Swamp Algae": "Goo",
  "Glowshroom": "Goo",
  "Swamp Gourd": "Goo",
  "Scrap Metal": "ROOMBA",
  "Scrap Wire": "ROOMBA",
  "Slimestone": "Goo",
  "Glass Orb": "George",
  "Carbon Sphere": "George",
  "Blue Feathers": "Star",
  "Acorn": "Vincent",
  "Frog": "Goo",
  "Spider": "George",
  "Snail": "Goo",
  "Aquamarine": "Rosalie",
  "Bird Egg": "George",
  "Arrowhead": "George",
  "Hide": "George",
}

const noKeep = [
  "Mealworms",
  "Minnows",
  "Gummy Worms",
  "Coal",
  "Eggs",
  "Feathers",
  "Milk",
  "Trout",
  "Twine",
  "Yarn",
  "Bucket",
  "Wooden Box",
]

const toInit = []
for (const [item, arg] of Object.entries(mailItemsToInit)) {
  toInit.push({
    item,
    action: "mail",
    arg,
    keep: noKeep.includes(item) ? undefined : 1000,
  })
}

initialize(toInit)
