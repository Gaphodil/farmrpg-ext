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

const parseEverything = (page, url) => {
    const parser = new DOMParser()
    const dom = parser.parseFromString(page, "text/html")
    const everythings = dom.querySelectorAll("a[href='everything.php']")
    let content;
    for (const thing of everythings) {
        if (thing.parentElement.className == "content-block") {
            content = dom.querySelector(".content-block")
            break;
        }
    }
    const items = {}
    if (!content) {
        throw "Unable to load everything"
    }
    for (const link of content.querySelectorAll("a")) {
        const img = link.querySelector(".itemimg img")
        // ignore if no image content
        if (!img) {
            continue
        }
        // assume image alt text is accurate itemname
        const alt = img.getAttribute("alt")
        if (!alt) {
            console.log("Unable to parse item name from ", img)
            continue
        }
        const linkMatch = link.getAttribute("href").match(itemLinkRE)
        if (!linkMatch) {
            console.log("Unable to parse item ID from link ", link.getAttribute("href"))
            continue
        }
        items[alt] = {
            "name": alt.trim(),
            "id": linkMatch[1],
            "image": img.getAttribute("src"),
        }
    }
    return { items }
}

const visitEverything = async (state, page, url) => {
    const every = parseEverything(page, url)
    for (const item in every.items) {
        await state.items.learn(every.items[item])
    }
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
    state.addPageHandler("everything", visitEverything)
    state.addClickHandler("invcount", clickInvCount)
}

export const fetchInventory = async state => {
    await state.fetchPage("https://farmrpg.com/inventory.php", visitInventory)
}
