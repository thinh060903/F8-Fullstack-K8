const button = document.getElementById("voice-button");
const message = document.getElementById("message");
const status = document.getElementById("status");
const commands = {
  google: "https://www.google.com",
  facebook: "https://www.facebook.com",
  youtube: "https://www.youtube.com",
  "google drive": "https://drive.google.com",
  "google maps": "https://maps.google.com",
  "bản đồ": "https://maps.google.com",
};
const songBaseURL = "https://zingmp3.vn/tim-kiem/tat-ca?q=";
const videoBaseURL = "https://www.youtube.com/results?search_query=";

button.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "vi-VN";
  recognition.start();

  message.textContent = "Hãy nói nội dung bạn muốn";
  status.textContent = "";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    message.textContent = `Đã nói xong. Hy vọng kết quả như ý bạn`;
    handleCommand(transcript);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onerror = (event) => {
    message.textContent = "Không thực hiện được yêu cầu";
    status.textContent = "";
  };
});

function handleCommand(transcript) {
  let executed = false;
  if (commands[transcript]) {
    window.open(commands[transcript], "_blank");
    executed = true;
  } else if (
    transcript.startsWith("chỉ đường") ||
    transcript.startsWith("tới") ||
    transcript.startsWith("đường tới")
  ) {
    const destination = transcript.split(" ").slice(2).join(" ");
    window.open(`https://maps.google.com/?q=${destination}`, "_blank");
    executed = true;
  } else if (
    transcript.startsWith("bài hát") ||
    transcript.startsWith("mở bài hát") ||
    transcript.startsWith("nghe bài hát")
  ) {
    const song = transcript.split(" ").slice(2).join(" ");
    window.open(`${songBaseURL}${encodeURIComponent(song)}`, "_blank");
    executed = true;
  } else if (
    transcript.startsWith("video") ||
    transcript.startsWith("mở video") ||
    transcript.startsWith("xem video")
  ) {
    const video = transcript.split(" ").slice(1).join(" ");
    window.open(`${videoBaseURL}${encodeURIComponent(video)}`, "_blank");
    executed = true;
  } else {
    message.textContent = "Không thực hiện được yêu cầu";
    status.textContent = "";
  }

  if (executed) {
    status.textContent = "Đã thực hiện xong";
  }
}
