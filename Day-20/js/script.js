var textElement = document.getElementById('text');
var textContent = textElement.innerText;
var index = 0;
var wordStart = 0;
var wordEnd = 0;

function changeWordColor() {
    while (wordEnd < textContent.length && textContent[wordEnd] !== ' ') {
        wordEnd++;
    }
    if (wordEnd < textContent.length) {
        wordEnd++;
    }
    var currentText = textContent.slice(0, wordStart) + `<span class="red">` + textContent.slice(wordStart, wordEnd) + `</span>` + textContent.slice(wordEnd);
    textElement.innerHTML = currentText;
    wordStart = wordEnd;
    index++;
    if (wordStart >= textContent.length) {
        wordStart = 0;
        wordEnd = 0;
        index = 0;
    }
}
setInterval(changeWordColor, 500);