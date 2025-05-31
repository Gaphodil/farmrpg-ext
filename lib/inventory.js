import { parseNumberString } from "./utils.js"

const maxInventoryRE = /more than <strong>([0-9,]+)<\/strong> of any/
const itemLinkRE = /id=(\d+)/

const parseInventory = (page, url) => {
    // Parse out the max inventory size.
    const maxInvMatch = page.match(maxInventoryRE)
    if (!maxInvMatch) {
        throw "Error parsing max inventory"
    }
    const maxInv = parseNumberString(maxInvMatch[1].replaceAll(",", ""))
    // Parse out all the items.
    const parser = new DOMParser()
    const invDom = parser.parseFromString(page, "text/html")
    const items = {}
    const quantities = {}
    for (const itemElm of invDom.querySelectorAll('.list-group li')) {
        // Ignore dividers.
        if (itemElm.classList.contains("item-divider")) {
            continue
        }

        const title = itemElm.querySelector(".item-title strong")
        if (!title) {
            console.log("Unable to parse item name from ", itemElm)
            continue
        }
        const after = itemElm.querySelector('.item-after')
        if (!after) {
            console.log("Unable to parse item quantity from ", itemElm)
            continue
        }
        const link = itemElm.querySelector("a.item-link")
        if (!link) {
            console.log("Unable to parse item ID from ", itemElm)
            continue
        }
        const linkMatch = link.getAttribute("href").match(itemLinkRE)
        if (!linkMatch) {
            console.log("Unable to parse item ID from link ", link.getAttribute("href"))
            continue
        }
        items[title.textContent] = {
            "name": title.textContent.trim(),
            "id": linkMatch[1],
            "image": itemElm.querySelector(".item-media img").getAttribute("src"),
        }
        quantities[title.textContent.trim()] = parseNumberString(after.textContent)
    }
    return { "max": maxInv, items, quantities }
}

const visitInventory = async (state, page, url) => {
    const inv = parseInventory(page, url)
    for (const item in inv.items) {
        await state.items.learn(inv.items[item])
    }
    state.player.inventory = inv.quantities
    state.player.maxInventory = inv.max
    await state.player.save(state.db)
}

/**
 * Click handler for the inventory count div.
 * @param {GlobalState} state
 * @param {string} eventType
 * @param {string} eventArg
 * @param {*} msg
 */
const clickInvCount = async (state, eventType, eventArg, msg) => {
    console.debug("Updating inventory")
    await fetchInventory(state)
}

export const setupInventory = state => {
    state.addPageHandler("inventory", visitInventory)
    state.addClickHandler("invcount", clickInvCount)
}

export const fetchInventory = async state => {
    await state.fetchPage("https://farmrpg.com/inventory.php", visitInventory)
}
