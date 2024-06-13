let bplVideos = document.querySelectorAll("[bpl-video");

bplVideos.forEach((video) => {
  let videoEl = video.querySelector("video");
  let videoPlayBtn = video.querySelector(".c-icon.play-btn");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.4 },
  });

  tl.to(videoPlayBtn, { autoAlpha: 0 });

  video.addEventListener("click", function () {
    video.classList.toggle("is-playing");
    if (video.classList.contains("is-playing")) {
      tl.restart();
      videoEl.play();
    } else {
      tl.reverse();
      videoEl.pause();
    }
  });
});