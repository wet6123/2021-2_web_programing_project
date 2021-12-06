window.addEventListener("load", () => {
  let MOVEING_PX = 5,
    AUTO_TIME = 5000,
    slide = document.querySelector(".slide"),
    indi = document.createElement("ul"),
    slideSheet = slide.getElementsByClassName("sheet"),
    slideSheetItem = slideSheet[0].getElementsByTagName("li"),
    prevBtn = document.getElementsByClassName("prev"),
    nextBtn = document.getElementsByClassName("next"),
    playSet = null,
    before = 0,
    after = 0,
    moveIng = false;

  // init
  slideSheetItem[0].style.left = 0;
  for (let i = 0; i < slideSheetItem.length; i++) {
    indi.innerHTML += "<li></li>";
  }
  indi.classList.add("indi");
  indi.children[0].classList.add("on");
  slide.appendChild(indi);

  for (let j = 0; j < indi.children.length; j++) {
    indiClick(j);
  }

  // autoPlay
  playSet = setInterval(function () {
    if (!moveIng) {
      after++;
      if (after >= slideSheetItem.length) {
        after = 0;
      }
      move(after, before, "next");
      before = after;
    }
  }, AUTO_TIME);

  // initEvnet
  nextBtn[0].addEventListener("click", (e) => {
    if (!moveIng) {
      after++;
      if (after >= slideSheetItem.length) {
        after = 0;
      }
      move(after, before, "next");
      before = after;
    }
  });

  prevBtn[0].addEventListener("click", (e) => {
    if (!moveIng) {
      after--;
      if (after < 0) {
        after = slideSheetItem.length - 1;
      }
      move(after, before);
      before = after;
    }
  });

  function indiClick(target) {
    indi.children[target].addEventListener("click", () => {
      if (!moveIng) {
        after = target;
        if (after > before) {
          move(after, before, "next");
        } else if (after < before) {
          move(after, before);
        }
        before = after;
      }
    });
  }

  function move(after, before, type) {
    let nextX = type === "next" ? slide.offsetWidth : slide.offsetWidth * -1,
      prevX = 0,
      set = null;
    set = setInterval(() => {
      moveIng = true;
      if (type === "next") {
        nextX -= MOVEING_PX;
        slideSheetItem[after].style.left = nextX + "px";
        if (nextX <= 0) {
          clearInterval(set);
          nextX = slide.offsetWidth;
          moveIng = false;
        }
        prevX -= MOVEING_PX;
      } else {
        nextX += MOVEING_PX;
        slideSheetItem[after].style.left = nextX + "px";
        if (nextX >= 0) {
          clearInterval(set);
          nextX = slide.offsetWidth * -1;
          moveIng = false;
        }
        prevX += MOVEING_PX;
      }
      slideSheetItem[before].style.left = prevX + "px";
    });
    indi.children[before].classList.remove("on");
    indi.children[after].classList.add("on");
  }
});
