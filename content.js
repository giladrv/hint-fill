
var currentTooltip = null
var currentElement = null

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

function isTextLikeInput(el) {
    if (!el) {
        return false
    }

    var tag = (el.tagName || "").toLowerCase()

    if (tag === "textarea") {
        return true
    }

    if (tag !== "input") {
        return false
    }

    var type = (el.type || "").toLowerCase()

    if (skipTypes.indexOf(type) !== -1) {
        return false
    }

    return true
}

function removeTooltip() {
    if (currentTooltip && currentTooltip.parentNode) {
        currentTooltip.parentNode.removeChild(currentTooltip)
    }

    currentTooltip = null
    currentElement = null
}

function positionTooltip(el, tooltip) {
    var rect = el.getBoundingClientRect()

    var top = rect.top + rect.height + 4
    var left = rect.left

    tooltip.style.top = top + "px"
    tooltip.style.left = left + "px"
}

function createTooltip(el) {
    removeTooltip()

    var placeholder = el.getAttribute("placeholder")

    if (!placeholder) {
        return
    }

    var isEmpty = !el.value || el.value.trim() === ""

    if (!isEmpty) {
        return
    }

    var tooltip = document.createElement("div")
    tooltip.textContent = "Fill with placeholder"
    tooltip.style.position = "fixed"
    tooltip.style.zIndex = "2147483647"
    tooltip.style.padding = "4px 8px"
    tooltip.style.borderRadius = "4px"
    tooltip.style.background = "#333"
    tooltip.style.color = "#fff"
    tooltip.style.fontSize = "12px"
    tooltip.style.cursor = "pointer"
    tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)"
    tooltip.style.userSelect = "none"
    tooltip.style.whiteSpace = "nowrap"

    positionTooltip(el, tooltip)

    tooltip.addEventListener("mousedown", function (event) {
        event.preventDefault()
    })

    tooltip.addEventListener("click", function (event) {
        event.preventDefault()

        if (!currentElement) {
            removeTooltip()
            return
        }

        var ph = currentElement.getAttribute("placeholder")

        if (ph) {
            currentElement.value = ph

            var inputEvent = new Event("input", { bubbles: true })
            currentElement.dispatchEvent(inputEvent)

            var changeEvent = new Event("change", { bubbles: true })
            currentElement.dispatchEvent(changeEvent)
        }

        removeTooltip()
    })

    document.body.appendChild(tooltip)

    currentTooltip = tooltip
    currentElement = el
}

document.addEventListener("focusin", function (event) {
    var el = event.target

    if (!isTextLikeInput(el)) {
        removeTooltip()
        return
    }

    createTooltip(el)
})

document.addEventListener("focusout", function (event) {
    if (event.target === currentElement) {
        removeTooltip()
    }
})

window.addEventListener("scroll", function () {
    if (currentTooltip && currentElement) {
        positionTooltip(currentElement, currentTooltip)
    }
}, true)

window.addEventListener("resize", function () {
    if (currentTooltip && currentElement) {
        positionTooltip(currentElement, currentTooltip)
    }
})
