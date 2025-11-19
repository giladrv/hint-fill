function fillFocusedWithPlaceholder() {
    var el = document.activeElement

    if (!el) {
        return
    }

    var tag = (el.tagName || "").toLowerCase()

    if (tag !== "input" && tag !== "textarea") {
        return
    }

    var type = (el.type || "").toLowerCase()

    var skipTypes = [
        "password",
        "hidden",
        "checkbox",
        "radio",
        "submit",
        "button",
        "file",
        "image",
        "reset",
        "color",
        "range",
        "date",
        "datetime-local",
        "month",
        "time",
        "week",
        "number"
    ]

    if (skipTypes.indexOf(type) !== -1) {
        return
    }

    var isEmpty = !el.value || el.value.trim() === ""
    var placeholder = el.getAttribute("placeholder")

    if (isEmpty && placeholder) {
        el.value = placeholder
    }
}

function runFillOnTab(tabId) {
    if (!tabId) {
        return
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: fillFocusedWithPlaceholder
    })
}

chrome.action.onClicked.addListener(function (tab) {
    if (!tab || !tab.id) {
        return
    }

    runFillOnTab(tab.id)
})

chrome.commands.onCommand.addListener(function (command) {
    if (command !== "fill-placeholder") {
        return
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs || !tabs.length) {
            return
        }

        var tab = tabs[0]

        if (!tab.id) {
            return
        }

        runFillOnTab(tab.id)
    })
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "fill-with-placeholder",
        title: "Fill with placeholder",
        contexts: ["editable"]
    })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId !== "fill-with-placeholder") {
        return
    }

    if (!tab || !tab.id) {
        return
    }

    runFillOnTab(tab.id)
})