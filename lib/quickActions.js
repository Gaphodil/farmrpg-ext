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
  "Mealworms": "Thomas",
  "Minnows": "Cpt Thomas",
  "Gummy Worms": "Buddy",
  "Coal": "Ric Ryph",
  // Daily
  "Eggs": "Star",
  "Feathers": "Star",
  "Milk": "Marina",
  "Trout": "Holger",
  // Crafting
  "Twine": "Charles",
  "Bucket": "Buddy",
  "Yarn": "Mummy",
  "Wooden Box": "Borgen",
  "Hammer": "Ric",
  "Axe": "Vincent",
  "Shovel": "Ric",
  "Leather Diary": "Mariya",
  // Boostable crops
  "Carrot": "frank",
  "Peas": "Holger",
  "Cucumber": "Mariya",
  "Eggplant": "Mariya",
  // Fishing, by zone
  "Drum": "Thomas",
  "Yellow Perch": "Geist",
  "Largemouth Bass": "Holger",
  "Flier": "Thomas",
  "Bluegill": "Holger",
  "Old Boot": "Ric",
  "Green Chromis": "Geist",
  "Blue Crab": "Geist",
  "Stingray": "Geist",
  // Exploring, by zone
  "Scrap Metal": "ROOMBA",
  "Scrap Wire": "ROOMBA",
  "Apple": "Charles",
  "Slimestone": "Borgen",
  "Glass Orb": "George",
  "Carbon Sphere": "George",
  "Unpolished Shimmer Stone": "Ric",
  "Horn": "Holger",
  "3-leaf Clover": "Charles",
  "Acorn": "Vincent",
  "Bone": "Mummy",
  "Aquamarine": "Rosalie",
  "Bird Egg": "George",
  "Arrowhead": "Holger",
}

const noKeep = [
  "Mealworms",
  "Minnows",
  "Gummy",
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
