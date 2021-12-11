const precautionVideo = document.querySelectorAll(".precautionVideo");

for (let i = 0; i < precautionVideo.length; i++) {
  precautionVideo[i].addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=n9oKaI-ChX8&t=7s");
  });
}
