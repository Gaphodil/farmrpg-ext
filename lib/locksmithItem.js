// https://farmrpg.com/#!/item.php?id=346 (lc1)
// https://farmrpg.com/#!/item.php?id=330 (gb1)

export const fetchGrabBagItems = (id) => {
    // hardcoded
    switch (id) {
        // grab bags
        case "330":
            return [
                {name: "3-leaf Clover"},
                {name: "Aquamarine"},
                {name: "Bone"},
                {name: "Catfish"},
                {name: "Gold Cucumber"},
                {name: "Mushroom"},
                {name: "Potato"},
            ]
        case "334":
            return [
                {name: "Ancient Coin"},
                {name: "Antler"},
                {name: "Fire Ant"},
                {name: "Giant Centipede"},
                {name: "Globber"},
                {name: "Gummy Worms"},
                {name: "Horn"},
                {name: "Shiny Beetle"},
                {name: "Snail"},
            ]
        case "396":
            return [
                {name: "Gold Carrot"},
                {name: "Gold Cucumber"},
                {name: "Gold Eggplant"},
                {name: "Gold Feather"},
                {name: "Gold Leaf"},
                {name: "Gold Peas"},
                {name: "Gold Peppers"},
                {name: "Treasure Key"},
            ]
        case "397":
            return [
                {name: "Runestone 01"},
                {name: "Runestone 02"},
                {name: "Runestone 03"},
                {name: "Runestone 04"},
                {name: "Runestone 05"},
                {name: "Runestone 06"},
                {name: "Runestone 07"},
                {name: "Runestone 08"},
                {name: "Runestone 09"},
                {name: "Runestone 10"},
            ]
        case "398":
            return [
                {name: "Runestone 11"},
                {name: "Runestone 12"},
                {name: "Runestone 13"},
                {name: "Runestone 14"},
                {name: "Runestone 15"},
                {name: "Runestone 16"},
                {name: "Runestone 17"},
                {name: "Runestone 18"},
                {name: "Runestone 19"},
                {name: "Runestone 20"},
            ]
        case "493":
            return [
                {name: "Ancient Coin"},
                {name: "Fishing Net"},
                {name: "Grape Juice"},
                {name: "Lemonade"},
                {name: "Orange Juice"},
                {name: "Skull Coin"},
                {name: "Steak"},
                {name: "Wine"},
            ]
        case "491":
            return [
                {name: "Gold Catfish"},
                {name: "Gold Coral"},
                {name: "Gold Drum"},
                {name: "Gold Flier"},
                {name: "Gold Jelly"},
                {name: "Gold Sea Bass"},
                {name: "Gold Sea Crest"},
                {name: "Gold Trout"},
                {name: "Goldfin"},
                {name: "Goldgill"},
                {name: "Goldjack"},
                {name: "Goldray"},
            ]
        case "583":
            return [
                {name: "Skeleton Key"},
                {name: "Small Key"},
                {name: "Square Key"},
                {name: "Treasure Key"},
            ]
        // spring seeds
        case "772":
            return [
                {name: "Spring Seeds"}
            ]
        // borgen bag 01
        case "861":
            return [
                {name: "Arnold Palmer"},
                {name: "Borgen Buck"},
                {name: "Happy Cookies"},
                {name: "Joker"},
                {name: "Large Chest 01"},
                {name: "Large Chest 02"},
                {name: "Large Chest 03"},
                {name: "Lovely Cookies"},
                {name: "Piece of Heart"},
                {name: "Raptor Claw"},
                {name: "Spooky Cookies"},
                {name: "Treasure Key"},
            ]
        // bug bag 01
        case "1043":
            return [
                {name: "Caterpillar"},
                {name: "Cricket"},
                {name: "Cyclops Spider"},
                {name: "Dragonfly"},
                {name: "Fire Ant"},
                {name: "Giant Centipede"},
                {name: "Grasshopper"},
                {name: "Gummy Worms"},
                {name: "Horned Beetle"},
                {name: "Mealworms"},
                {name: "Onyx Scorpion"},
                {name: "Ruby Scorpion"},
                {name: "Shiny Beetle"},
                {name: "Snail"},
                {name: "Spider"},
            ]
        // friendship bag 01
        case "1148":
            return [
                {name: "Five Point Mace"},
                {name: "Heart Container"},
                {name: "Perfect Paint Palette"},
                {name: "Prism Shell"},
                {name: "Ramjoram's Mask"},
                {name: "Refined Corn Quartz"},
            ]
        // bait bag 01
        case "1230":
            return [
                {name: "Grubs"},
                {name: "Gummy Worms"},
                {name: "Mealworms"},
                {name: "Minnows"},
                {name: "Worms"},
            ]
    }
}
