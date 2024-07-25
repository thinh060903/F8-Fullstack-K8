document.getElementById("newFile").addEventListener("click", () => {
  document.getElementById("editor").innerHTML = "";
  document.getElementById("fileName").value = "untitled";
  updateStatus();
});

document.getElementById("saveTxt").addEventListener("click", () => {
  const content = document.getElementById("editor").innerText;
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${document.getElementById("fileName").value}.txt`;
  link.click();
});

document.getElementById("savePdf").addEventListener("click", () => {
  const element = document.getElementById("editor");
  const opt = {
    margin: 1,
    filename: `${document.getElementById("fileName").value}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(element).set(opt).save();
});

document.getElementById("boldButton").addEventListener("click", () => {
  document.execCommand("bold");
  toggleButtonState("boldButton");
});

document.getElementById("underlineButton").addEventListener("click", () => {
  document.execCommand("underline");
  toggleButtonState("underlineButton");
});

document.getElementById("italicButton").addEventListener("click", () => {
  document.execCommand("italic");
  toggleButtonState("italicButton");
});

document.getElementById("colorPicker").addEventListener("input", (event) => {
  document.execCommand("foreColor", false, event.target.value);
});

const editor = document.getElementById("editor");
editor.addEventListener("input", updateStatus);

function updateStatus() {
  const text = editor.innerText.trim();
  document.getElementById("charCount").innerText = `Số ký tự: ${text.length}`;
  document.getElementById("wordCount").innerText = `Số từ: ${
    text.split(/\s+/).length
  }`;
}

function toggleButtonState(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.toggle("active");
}
