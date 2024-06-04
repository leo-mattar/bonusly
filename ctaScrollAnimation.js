let ctaSection = document.querySelector("[cta-trigger]");
let headerDemoBtn = document.querySelector(
  ".c-header_rt .c-btn.is-medium.is-nav.demo"
);
let headerTrialBtn = document.querySelector(".c-header_rt .c-free-trial");

if (ctaSection) {
  gsap.set(headerDemoBtn, { x: -16 });
  gsap.set(headerTrialBtn, { x: -16 });

  let tl = gsap.timeline({
    defaults: { ease: "power4.inOut", duration: 0.6 },
    scrollTrigger: {
      trigger: ctaSection,
      start: "center top",
      end: "bottom top",
      onEnter: () => {
        tl.restart();
      },
      onLeaveBack: () => {
        tl.reverse();
      },
    },
  });

  tl.to(headerTrialBtn, { autoAlpha: 1, x: 0 });
  tl.to(headerDemoBtn, { autoAlpha: 1, x: 0 }, 0.2);
}