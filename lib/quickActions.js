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
  // Boostable crops
  "Carrot": "frank",
  "Cucumber": "Mariya",
  "Eggplant": "Mariya",
  // Fishing, by zone
  "Yellow Perch": "Geist",
  "Green Chromis": "Geist",
  "Blue Crab": "Cpt Thomas",
  "Stingray": "Geist",
  // Exploring, by zone
  "Scrap Metal": "ROOMBA",
  "Scrap Wire": "ROOMBA",
  "Glass Orb": "George",
  "Carbon Sphere": "George",
  "Blue Feathers": "Star",
  "Acorn": "Vincent",
  "Spider": "George",
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
