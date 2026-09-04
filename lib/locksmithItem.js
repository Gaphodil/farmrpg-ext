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
        case "453":
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
        // buddy doll bag 01
        case "1297":
            return [
                {name: "Ghost Buddy Doll"},
                {name: "Krampus Buddy Doll"},
                {name: "Movember Buddy Doll"},
                {name: "Nut Cracker Buddy Doll"},
                {name: "Rudolph Buddy Doll"},
                {name: "Santa Buddy Doll"},
                {name: "Turkey Buddy Doll"},
                {name: "Vampire Buddy Doll"},
                {name: "Werewolf Buddy Doll"},
                {name: "Zombie Buddy Doll"},
            ]
        // buddy doll bag 02
        case "1318":
            return [
                {name: "Cupid Buddy Doll"},
                {name: "Frozen Buddy Doll"},
                {name: "Groundhog Buddy Doll"},
                {name: "Leprechaun Buddy Doll"},
                {name: "Lucky Cat Buddy Doll"},
                {name: "Snowman Buddy Doll"},
                {name: "Tanooki Buddy Doll"},
            ]
        // event token purse
        case "1264":
            return [
                {name: "Event Token"}
            ]
        // egg basket
        case "753":
            return [
                {name: "Egg 01"},
                {name: "Egg 02"},
                {name: "Egg 03"},
                {name: "Egg 04"},
                {name: "Egg 05"},
                {name: "Egg 06"},
                {name: "Egg 07"},
                {name: "Egg 08"},
                {name: "Egg 09"},
                {name: "Egg 10"},
                {name: "Egg 11"},
                {name: "Egg 12"},
            ]
        // magical egg basket
        case "1031":
            return [
                {name: "Egg of Ages"},
                {name: "Egg of Air"},
                {name: "Egg of Chaos"},
                {name: "Egg of Earth"},
                {name: "Egg of Fire"},
                {name: "Egg of Life"},
                {name: "Egg of Light"},
                {name: "Egg of Shadow"},
                {name: "Egg of Space"},
                {name: "Egg of Water"},
            ]
        // fuzzy egg
        case "1228":
            return [
                {name: "Fuzzy Chick 01"},
                {name: "Fuzzy Chick 02"},
                {name: "Fuzzy Chick 03"},
                {name: "Fuzzy Chick 04"},
                {name: "Fuzzy Chick 05"},
                {name: "Fuzzy Chick 06"},
                {name: "Fuzzy Chick 07"},
                {name: "Fuzzy Chick 08"},
                {name: "Fuzzy Chick 09"},
                {name: "Fuzzy Chick 10"},
                {name: "Fuzzy Chick 11"},
                {name: "Fuzzy Chick 12"},
            ]
        // galactic egg basket
        case "1489":
            return [
                {name: "Asteroid Egg"},
                {name: "Black Hole Egg"},
                {name: "Comet Egg"},
                {name: "Moon Egg"},
                {name: "Nebula Egg"},
                {name: "Planet Egg"},
                {name: "Sun Egg"},
            ]
        // mining bags 01-06
        case "1554":
            return [
                {name: "Pickaxe"},
                {name: "Bone Pickaxe"},
            ]
        case "1555":
            return [
                {name: "Bone Pickaxe"},
                {name: "Crystal Pickaxe"},
                {name: "Explosive"},
            ]
        case "1556":
            return [
                {name: "Crystal Pickaxe"},
                {name: "Sturdy Pickaxe"},
                {name: "Explosive"},
            ]
        case "1557":
            return [
                {name: "Sturdy Pickaxe"},
                {name: "Steel Pickaxe"},
                {name: "Bomb"},
            ]
        case "1558":
            return [
                {name: "Steel Pickaxe"},
                {name: "Heavy Pickaxe"},
                {name: "Bomb"},
            ]
        case "1606":
            return [
                {name: "Heavy Pickaxe"},
                {name: "Ancient Pickaxe"},
                {name: "Bomb"},
            ]
    }
}
