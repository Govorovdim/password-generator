const lowercase = "abcdefghijklmnopqrstuvwxyz"
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "~`!@#$%^&*()_-+={[}],|:;<>.?/"
const snackbarEl = document.getElementById("snackbar")
const sliderEL = document.getElementById("password-length")
const lengthEL = document.getElementById("length")
const lowercaseCheckEl = document.getElementById("lowercase-check")
const uppercaseCheckEl = document.getElementById("uppercase-check")
const numbersCheckEl = document.getElementById("numbers-check")
const symbolsCheckEl = document.getElementById("symbols-check")
const generateBtn = document.getElementById("generate-password-btn")
const copyPassBtn = document.getElementById("copy-password-btn")

function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

generateBtn.addEventListener("click", function () {
    let i = sliderEL.value
    let password = ""
    while (i) {
        let letters = getPasswordParts()
        password += letters.charAt(getRandomNumber(letters.length))
        --i
    }
    copyPassBtn.textContent = password
});

copyPassBtn.addEventListener("click", function () {
    if(copyPassBtn.textContent !== "") {
        const el = document.createElement('textarea')
        el.value = copyPassBtn.textContent
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        if (selected) {
            document.getSelection().removeAllRanges()
            document.getSelection().addRange(selected)
        }
        showSnackbar(copyPassBtn.textContent)
    }
});

sliderEL.oninput = function () {
    lengthEL.textContent = this.value;
}

function showSnackbar(input) {
    snackbarEl.textContent = `Copied into clipboard`
    snackbarEl.className = "show"
    setTimeout(function () {
        snackbarEl.className = snackbarEl.className.replace("show", "")
    }, 3000)
}

function getPasswordParts() {
    let result = ""
    result += lowercaseCheckEl.checked ? lowercase : ''
    result += uppercaseCheckEl.checked ? uppercase : ''
    result += numbersCheckEl.checked ? numbers : ''
    result += symbolsCheckEl.checked ? symbols : ''
    return result
}