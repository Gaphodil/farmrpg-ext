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
  "Gummy Worms": "Buddy",
  "Coal": "Ric Ryph",
  // Daily
  "Eggs": "Star",
  "Feathers": "Star",
  "Milk": "Mariya",
  "Trout": "Holger",
  // Crafting
  "Twine": "Charles",
  "Bucket": "Buddy",
  "Yarn": "Mummy",
  "Wooden Box": "Vincent",
  "Hammer": "Ric",
  "Axe": "Vincent",
  "Shovel": "Ric",
  "Leather Diary": "Mariya",
  "Green Parchment": "Ric",
  "Green Dye": "Rosalie",
  "Purple Dye": "Rosalie",
  "Blue Dye": "Rosalie",
  "Red Dye": "Rosalie",
  // Boostable crops
  "Carrot": "frank",
  "Peas": "Holger",
  "Cucumber": "Mariya",
  "Eggplant": "Mariya",
  "Potato": "Holger",
  // Fishing, by zone
  "Yellow Perch": "Geist",
  "Carp": "Holger",
  "Largemouth Bass": "Holger",
  "Fish Bones": "Mummy",
  "Bluegill": "Holger",
  "Old Boot": "Ric",
  "Green Chromis": "Geist",
  "Blue Crab": "Cpt Thomas",
  "Stingray": "Geist",
  // Exploring, by zone
  "Scrap Metal": "ROOMBA",
  "Scrap Wire": "ROOMBA",
  "Apple": "Charles",
  "Glass Orb": "George",
  "Carbon Sphere": "George",
  "Unpolished Shimmer Stone": "Ric",
  "Horn": "Holger",
  "Giant Centipede": "Buddy",
  "Blue Feathers": "Star",
  "3-leaf Clover": "Charles",
  "Acorn": "Vincent",
  "Spider": "Mummy",
  "Bone": "Mummy",
  "Aquamarine": "Rosalie",
  "Bird Egg": "George",
  "Arrowhead": "Holger",
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
