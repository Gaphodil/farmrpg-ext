import { parseNumberString } from './utils.js'

const dummyRE = /.*(?:"hit"|"miss"|"trap").*/
const tileMinedItemRE = /<br\\\/>([A-Za-z ]+)\s+(?:\(x([0-9,]+)\))?\s*($|<)/
const itemDepositRE = /itemdeposit\|([0-9,]+)\|(?:.*)\|(.*?)"/
// "status":"itemdeposit|130|\/img\/items\/coal.png|Coal"
// "status":"<br\/><span style='font-size:11px'>You found something!<br\/><img src='\/img\/items\/9441.png' class='itemimg'><br\/>Calcifite (x22)<br\/><\/span><span id=\"item_result\" style=\"display:none\">\/img\/items\/9441.png|1,1;2,1;3,1;4,1;5,1|22|Calcifite<\/span>"

const parseMining = (page, url) => {
    const loc = {items: []}
    // Parse the ID out of the URL.
    const parsedUrl = new URL(url)
    loc.id = parsedUrl.searchParams.get("id")
    // Parse the name from the HTML.
    const parser = new DOMParser()
    const dom = parser.parseFromString(page, "text/html")
    loc.name = dom.querySelector(".center.sliding").childNodes[0].nodeValue.trim()
    return loc
}

const visitMining = async (state, page, url) => {
    const loc = parseMining(page, url)
    state.lastView = "location"
    state.lastLocationType = "mining"
    state.lastLocation = loc.name
}

const parseTileMined = (page, url) => {
    const results = {}
    // Parse the ID out of the URL.
    const parsedUrl = new URL(url)
    results.locID = parsedUrl.searchParams.get("id")
    // unlike fishing/exploring can return JSON instead of HTML, can return no item
    var match = page.match(dummyRE)
    if (match) {
        // no items to update
        return null
    }
    match = page.match(tileMinedItemRE)
    if (match) {
        results.item = match[1]
        results.quantity = match[2] ? parseNumberString(match[2]) : 1
        results.overflow = page.includes("filter: grayscale")
        return results
    }
    match = page.match(itemDepositRE)
    if (!match) {
        throw `Unable to find item in mining_check_cell: ${page}`
    }
    // swapped for itemdeposit
    results.item = match[2]
    results.quantity = parseNumberString(match[1])
    results.overflow = page.includes("filter: grayscale")
    return results
}

const visitTileMined = async (state, page, url) => {
    const results = parseTileMined(page, url)
    if (results) {
        const loc = await state.locations.getByID("mining", results.locID)
        if (!loc) {
            throw `Unknown mining loc for results: ${results.locID}`
        }
        // Update inventory.
        state.player.inventory[results.item] = results.overflow ? state.player.maxInventory : ((state.player.inventory[results.item] || 0) + 1)
        await state.player.save(state.db)
    }
}

export const setupMining = state => {
    state.addPageHandler("mining", visitMining)
    state.addWorkerHandler("mining_check_cell", visitTileMined)
    // bombs not possible
}
