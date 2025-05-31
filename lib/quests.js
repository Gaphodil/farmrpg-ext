import { findSection, parseNumberString } from "./utils.js"

class Quest {
    constructor(data) {
        Object.assign(this, data)
    }
}

class QuestDB {
    constructor(db) {
        this.db = db
    }

    async learn(data) {
        if (!data.id) {
            throw "ID is required"
        }
        const tx = this.db.transaction("quests", "readwrite")
        const existing = (await tx.store.get(data.id)) || {firstSeen: Date.now()}
        const newData = {
            firstSeen: existing.firstSeen,
            ...data
        }
        const allKeys = {
            ...existing,
            ...data,
        }
        let change = false
        for (const key in allKeys) {
            if (JSON.stringify(newData[key]) !== JSON.stringify(existing[key])) {
                console.debug(`QuestDB: Changed key ${key}`, newData[key], existing[key])
                change = true
                break
            }
        }
        if (change) {
            console.log(`QuestDB: Learning new data about ${data.id}: ${JSON.stringify(data)}`)
            await Promise.all([
                tx.store.put(newData),
                tx.done,
            ])
        }
    }

    /**
     * Fetch data for an item.
     * @param {string} id
     * @returns {Quest?}
     */
    async get(id) {
        const quest = await this.db.get("quests", id)
        return quest ? new Quest(quest) : quest
    }
}

/**
 * Try to parse a quest text block.
 * @param {string} text
 */
const parseQuestText = (text) => {
    // Oh god parsing this hurts.
    // First pull out the quest text, this is anything up to "Requires:",
    // "Available ...", "You completed this request!", or the end.
    console.debug("quest text", text)
    let match = (text + "\n__END__").match(/^\s*(.*?)\s*(Requires:|Available ... \d|You completed this request!|__END__)/ms)
    if (!match) {
        // The whole thing is the text, no metadata. Bail out now.
        return {text: text.trim()}
    }
    const quest = {text: match[1]}
    // Look for level or availability metadata.
    match = text.match(/Requires:.*Farming (\d+)/msi)
    if (match) {
        quest.requiresFarming = parseNumberString(match[1])
    }
    match = text.match(/Requires:.*Crafting (\d+)/msi)
    if (match) {
        quest.requiresCrafting = parseNumberString(match[1])
    }
    match = text.match(/Requires:.*Fishing (\d+)/msi)
    if (match) {
        quest.requiresFishing = parseNumberString(match[1])
    }
    match = text.match(/Requires:.*Exploring (\d+)/msi)
    if (match) {
        quest.requiresExploring = parseNumberString(match[1])
    }
    match = text.match(/Requires:.*Tower (\d+)/msi)
    if (match) {
        quest.requiresTower = parseNumberString(match[1])
    }
    match = text.match(/Requires:.*Cooking (\d+)/msi)
    if (match) {
        quest.requiresCooking = parseNumberString(match[1])
    }
    // Look for availability. This is weird and bad because it doesn't include a year
    //  but I can probably fix that later by comparing the year the quest came out?
    match = text.match(/Available (\w+ \d+) - (\w+ \d+)/)
    if (match) {
        quest.availableFrom = match[1]
        quest.availableTo = match[2]
    }
    return quest
}

/**
 * Parse an item row.
 * @param {Element} row
 * @returns {{id: string, quantity: number} | null}
 */
const parseItemRow = (row) => {
    const link = row.querySelector("a")
    if (!link) {
        return null
    }
    // Quest 219, Islands Are Hard To Catch VII, has a glitch with some leading spaces on two of the item IDs.
    const id = new URL(link.href).searchParams.get("id").trim()
    const quantity = parseNumberString(row.querySelector(".item-after").textContent)
    return {id, quantity}
}

/**
 * Parse out quest data.
 * @param {Document} dom
 * @param {URL} parsedUrl
 */
const parseQuest = (dom, parsedUrl) => {
    const quest = {itemRequests: [], itemRewards: []}
    quest.id = parsedUrl.searchParams.get("id")
    quest.name = dom.querySelector(".center.sliding").innerText
    const prereq = dom.querySelector(".page").dataset.prereq
    quest.prereq = prereq === "0" ? null : prereq
    // The first card is the details.
    const firstTitleMatch = dom.querySelector(".content-block-title").innerText.match(/(Personal )?Request from (.*?)\s*$/i)
    quest.isPersonal = !!firstTitleMatch[1]
    quest.from = firstTitleMatch[2]
    const firstCard = dom.querySelector(".card-content-inner")
    quest.fromImage = firstCard.querySelector(".itemimg").getAttribute("src")
    // For unknown reasons, firstCard.innerText is not correctly seeing all the brs as newlines?
    const realInnerText = firstCard.innerHTML.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>/g,"")
    Object.assign(quest, parseQuestText(realInnerText))
    // Then the requests.
    const silverRequested = findSection(dom, "Silver Requested")
    if (silverRequested) {
        quest.silverRequest = parseNumberString(silverRequested.querySelector(".item-after").textContent)
    }
    const itemsRequested = findSection(dom, "Items Requested")
    if (itemsRequested) {
        for (const row of itemsRequested.querySelectorAll("li")) {
            quest.itemRequests.push(parseItemRow(row))
        }
    }
    // Finally the rewards.
    const rewards = findSection(dom, "Rewards")
    if (rewards) {
        for (const row of rewards.querySelectorAll("li")) {
            const item = parseItemRow(row)
            if (item) {
                quest.itemRewards.push(item)
            } else {
                // Silver or gold.
                const name = row.querySelector(".item-title").textContent.toLowerCase().trim()
                const quantity = parseNumberString(row.querySelector(".item-after").textContent)
                quest[`${name}Reward`] = quantity
            }
        }
    }
    return quest
}

/**
 * Visit quest.php.
 * @param {GlobalState} state
 * @param {Document} dom
 * @param {URL} parsedUrl
 */
const visitQuest = async (state, dom, parsedUrl) => {
    const quest = parseQuest(dom, parsedUrl)
    await state.quests.learn(quest)
}

/**
 * Setup the quests module.
 * @param {GlobalState} state
 */
export const setupQuests = state => {
    state.quests = new QuestDB(state.db)
    state.fetchAllQuests = async (personal=false) => fetchAllQuests(state, personal)
    state.addPageHandler("quest", visitQuest, {parse: true})
}

/**
 * Force-update a quest.
 * @param {GlobalState} state
 * @param {string} id
 */
export const fetchQuest = async (state, id) => {
    const url = `https://farmrpg.com/quest.php?id=${id}`
    const resp = await fetch(url)
    if (!resp.ok) {
        throw `Error getting quest ${id}: ${resp.status}`
    }
    const page = await resp.text()
    if (page.trim() === "") {
        throw `Empty response for quest ${id}`
    }
    const parser = new DOMParser()
    const dom = parser.parseFromString(page, "text/html")
    await visitQuest(state, dom, new URL(url))
}

/**
 * Force-update all quests up to a given ID.
 * @param {GlobalState} state
 * @param {boolean} personal
 */
export const fetchAllQuests = async (state, personal=false) => {
    if (state.runningFetchAll) {
        return
    }
    state.runningFetchAll = true
    // Fetch the list of quest IDs to refresh.
    const questsDom = await state.fetchPage("https://farmrpg.com/quests.php", (state, dom) => dom, {parse: true})
    const questsCompDom = await state.fetchPage("https://farmrpg.com/questscomp.php", (state, dom) => dom, {parse: true})
    const phrDom = personal ? await state.fetchPage("https://farmrpg.com/questscomp.php?phr=1", (state, dom) => dom, {parse: true}) : null
    state.fetchAllQuests = [
        ...questsDom.querySelectorAll("a.item-link"),
        ...questsCompDom.querySelectorAll("a.item-link"),
        ...(personal ? phrDom.querySelectorAll("a.item-link") : []),
    ].map(elm => new URL(elm.href).searchParams.get("id"))

    console.log(`fetch-all-quests ${new Date().toISOString()} Fetching ${state.fetchAllQuests.length} quests`)
    const fn = async alarm => {
        if (alarm.name === "fetch-all-quests") {
            const id = state.fetchAllQuests.pop()
            console.log(`fetch-all-quests ${new Date().toISOString()} Fetching quest id=${id}`)
            try {
                await fetchQuest(state, id)
            } catch(err) {
                console.log(`fetch-all-quests ${new Date().toISOString()} Error fetching quest id=${id}`, err)
            }
            if (!state.fetchAllQuests || state.fetchAllQuests.length === 0) {
                browser.alarms.clear("fetch-all-quests")
                browser.alarms.onAlarm.removeListener(fn)
                state.runningFetchAll = undefined
            }
        }
    }
    browser.alarms.onAlarm.addListener(fn)
    browser.alarms.create("fetch-all-quests", {periodInMinutes: 1/30})
}
