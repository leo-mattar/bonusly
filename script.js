gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false
});

// BONUS COUNT
$(document).ready(function () {
  $.getJSON("https://bonus.ly/api/v1/bonuses/bonus_count", function (data) {
    if (typeof data.result === "undefined") {
      $(".bonus-count").text("Unable to retrieve bonus count.");
    } else {
      var bonus_count = data.result;
      var formatted_count = bonus_count.toLocaleString();
      $(".bonus-count").text(formatted_count);
    }
  }).fail(function () {
    $(".bonus-count").text("Error retrieving bonus count.");
  });
});

// BLOG SEARCH
function blogSearch() {
  $(".c-search-input").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      $(".c-search-trigger").click();
    }
  });
}

// RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// GLOBAL PAGE LOAD
function pageLoad() {
  let tl = gsap.timeline({ delay: 0.6 });
  tl.to(".o-page-wrapper, .c-header, .c-section.alert", {
    autoAlpha: 1,
    duration: 0.6
  });
}

// ITEM PLACEMENT
function itemPlacement() {
  $("[item-placement]").each(function () {
    let itemEl = $(this).find("[item-el]");
    let itemElAfter = $(this).find("[item-el-after]");

    itemEl.prependTo($(this));
    itemElAfter.appendTo($(this));
  });
}
itemPlacement();

// // HEADER SCROLL
// function headerScroll() {
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".c-body",
//       start: "150 top",
//       end: "+=1",
//       onEnter: () => {
//         tl.play();
//         $(".c-header").addClass("scrolled");
//       },
//       onLeaveBack: () => {
//         tl.reverse();
//         $(".c-header").removeClass("scrolled");
//       }
//     }
//   });
// }
function headerScroll() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "150 top",
      end: "200 top",  // Increased the end value to avoid the rapid toggle issue
      toggleClass: {
        targets: ".c-header",
        className: "scrolled"
      }
    }
  });
}

// HEADER DROPDOWN DESKTOP
function headerDropdownDesktop() {
  $(".c-dd-link").each(function () {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" }
    });

    gsap.set(dropdownList, { display: "flex", visibility: "hidden" });

    tl.to(dropdownList, { autoAlpha: 1, scale: 1 });
    tl.to($(this), { backgroundColor: "#E8F1FD" }, 0);
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// HEADER MOBILE
function headerMobile() {
  $(".c-header_rt").appendTo(".c-header_center");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.6 }
  });

  let openNavEl = $(".c-nav-btn");
  let openNavIconBar1 = $(".c-nav-bar.is-1");
  let openNavIconBar2 = $(".c-nav-bar.is-2");
  let openNavIconBar3 = $(".c-nav-bar.is-3");
  let headerNav = $(".c-header_center");
  let navRight = $(".c-header_rt");

  gsap.set(navRight, { display: "none", autoAlpha: 0 });

  tl.to(headerNav, { height: "calc(100% - 3.75em)", overflow: "auto" });
  tl.to(openNavIconBar1, { translateY: 10, rotation: -45 }, 0);
  tl.to(openNavIconBar2, { scaleX: 0 }, 0);
  tl.to(openNavIconBar3, { translateY: -10, rotation: 45 }, 0);
  tl.to(navRight, { autoAlpha: 1, display: "flex" }, "<0.2");

  openNavEl.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
      $(".c-body").addClass("no-scroll");
      // window.SmoothScroll.stop();
    } else {
      // window.SmoothScroll.start();
      $(".c-body").removeClass("no-scroll");
      tl.reverse();
    }
  });
}

// HEADER DROPDOWN MOBILE
function headerDropdownMobile() {
  $(".c-dd-link").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut", duration: 0.6 }
    });

    let dropdownList = $(this).find(".c-dd-list");
    let dropdownArrow = $(this).find(".c-icon.dd-arrow");
    let dropdownTrigger = $(this).find(".c-dd-link-top");

    gsap.set(dropdownList, { display: "flex", autoAlpha: 0, height: 0 });

    tl.to(dropdownList, { height: "auto", autoAlpha: 1 });
    tl.to(dropdownArrow, { rotation: 180 }, 0);

    dropdownTrigger.on("click", function () {
      $(".c-dd-link-top.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// HEADER SEARCH
function headerSearchDesktop() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.4 }
  });

  let searchTrigger = $(".c-search-expand");
  let searchEl = $(".c-search-wrap");
  let searchBtn = $(".c-search-btn");
  let searchIcon = $(".c-icon.is-search");

  tl.to(searchEl, { autoAlpha: 1, width: "100%" });
  tl.fromTo(searchBtn, { width: "2.75em" }, { width: "22em" }, 0);
  tl.to(searchTrigger, { position: "absolute", right: 0 }, 0);

  searchTrigger.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
    } else {
      tl.reverse();
    }
  });
}

// PRESENTER ACCORDION
function accordion() {
  $(".c-presenter").each(function () {
    let tl = gsap.timeline({ paused: true });

    let accordionTxt = $(this).find(".c-presenter-bio");
    let accordionIcon = $(this).find(".c-icon");
    let accordionBtnTxt = $(this).find(".c-bio-btn-txt");

    gsap.set(accordionTxt, { height: 0 });

    tl.to(accordionTxt, {
      height: "auto",
      duration: 0.3,
      ease: "power1.inOut"
    });
    tl.to(
      accordionIcon,
      { rotate: 45, duration: 0.3, ease: "power1.inOut" },
      0
    );

    $(this).on("click", function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        accordionBtnTxt.text("Close");
        tl.restart();
      } else {
        accordionBtnTxt.text("Open");
        tl.reverse();
      }
    });
  });
}

accordion();

// BLOG TOC MOBILE
function tocBlog() {
  let tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.4,
      ease: "power1.inOut"
    }
  });

  gsap.set(".c-toc-overlay", { display: "block", autoAlpha: 0 });

  tl.to(".c-toc", { height: "auto" });
  tl.to(".toc-arrow", { rotation: 180 }, 0);
  tl.to(".c-toc-overlay", { autoAlpha: 1 }, 0);
  // tl.to(
  //   ".c-toc",
  //   {
  //     borderBottomLeftRadius: 24,
  //     borderBottomRightRadius: 24
  //   },
  //   0.1
  // );

  $(".c-toc-header").on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      $(".c-body").addClass("no-scroll");
      tl.restart();
    } else {
      $(".c-body").removeClass("no-scroll");
      tl.reverse();
    }
  });

  $(".c-toc-link-inner, .c-toc-overlay").on("click", function () {
    $(".c-body").removeClass("no-scroll");
    $(".c-toc-header").toggleClass("is-open");
    tl.reverse();
  });
}

// Rewards catalog - open/close catalog item
function catalogItem() {
  $(".c-catalog-form-item").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut", duration: 0.6 }
    });

    let itemContent = $(this);
    let itemIcon = $(this).find(".c-icon");
    let itemTrigger = $(this).find(".c-catalog-form-item-trigger");

    gsap.set(itemContent, { height: "3.5em" });
    gsap.set(itemIcon, { rotation: 180 });

    tl.to(itemContent, { height: "auto", marginBottom: "1.25em" });
    tl.to(itemIcon, { rotation: 0 }, 0);

    $(".c-catalog-change-txt").on("click", function () {
      $(".c-catalog-select").click();
    });

    itemTrigger.on("click", function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// RADIO/CHECKBOX STATUS
function checkRadioStatus() {
  // Get all elements with class "c-catalog-radio-button-field"
  const radioButtons = document.querySelectorAll(
    ".c-catalog-radio-button-field"
  );

  // Add click event listener to each radio button
  radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener("click", () => {
      if (index > 0) {
        // If this is not the first radio button, click the reset button
        const resetButton = document.querySelector(".c-catalog-featured-reset");
        resetButton.click();
      }
    });
  });
}

function allRadioFeatured() {
  const allItemsRadio = document.querySelector("#all-items-radio");
  const catalogFeaturedDiv = document.querySelector(".c-catalog-featured");

  allItemsRadio.addEventListener("click", () => {
    catalogFeaturedDiv.click();
  });
}

// TOPICS HOSTNAME
function topicsHostname() {
  // Get all elements with class .c-topic
  const links = document.querySelectorAll(".c-topic");

  // Loop through each link and update the href attribute
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.startsWith("http://")) {
      link.setAttribute("href", href.substr(7));
    }
  });
}
topicsHostname();

// WEBINAR MOBILE DROPDOWN
function webinarMobileTopicsDropdown() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.6 }
  });

  let webinarTrigger = $(".c-webinar-topics-title");
  let webinarList = $(".c-filter-options.webinar");
  let webinarListIcon = $(".c-icon.webinar-topics");

  tl.to(webinarList, { height: "auto" });
  tl.to(webinarListIcon, { rotation: 180 }, 0);

  webinarTrigger.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
    } else {
      tl.reverse();
    }
  });
}

// VIDEO LIGHTBOX MODAL
function lightboxModal() {
  $("[video-component]").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut", duration: 0.3 }
    });

    let lightboxModal = $(this).find(".c-video-lightbox");
    let lightboxClose = $(this).find(".c-video-lightbox-close");
    let lightboxTrigger = $(this).find("[video-card]");
    let lightboxBG = $(this).find(".c-video-lightbox-bg");

    tl.to(lightboxModal, { autoAlpha: 1 });

    lightboxTrigger.on("click", function () {
      // window.SmoothScroll.stop();
      tl.restart();
    });

    lightboxClose.on("click", function () {
      // window.SmoothScroll.start();
      tl.reverse();
    });

    lightboxBG.on("click", function () {
      // window.SmoothScroll.start();
      tl.reverse();
    });
  });
}

lightboxModal();

// INTEGRATION HERO
function integrationHero() {
  let tl = gsap.timeline({ repeat: -1 });

  tl.to("[integration-spin]", { rotation: 360, duration: 100, ease: "none" });
}
integrationHero();

// ALERT BAR
function alertBar() {
  $("[alert-bar]").each(function () {
    let tl = gsap.timeline({ paused: true });
    let alertCloseTrigger = $(this).find(".c-alert-close");

    tl.to($(this), { height: 0, duration: 0.8, ease: "power3.out" });
    $(alertCloseTrigger).on("click", function () {
      tl.restart();
    });
  });
}
alertBar();

// TEXT HIGHLIGHT
$(".span-wrapper").each(function (index) {
  let relatedEl = $(".span-element").eq(index);
  relatedEl.appendTo($(this));
});

// MARQUEE
function marquee() {
  let tl = gsap.timeline({ repeat: -1 });

  tl.fromTo(
    ".c-marquee-wrap",
    { xPercent: 0 },
    { xPercent: -100, duration: 90, ease: "none" }
  );
}
marquee();

// FAQ accordion
function faqAccordion() {
  $(".c-accordion").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" }
    });
    let accordionIcon = $(this).find(".c-accordion-icon");
    let accordionTop = $(this).find(".c-accordion_bt");

    tl.to(accordionTop, { height: "auto", marginTop: "1em" });
    tl.to(accordionIcon, { rotate: 45 }, 0);

    $(this).on("click", function () {
      $(".c-accordion.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}
faqAccordion();

// Peer to Peer Accordion
function peerAccordion() {
  $(".c-accordion-2").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" }
    });
    let accordionIcon = $(this).find(".c-accordion-icon");
    let accordionTop = $(this).find(".c-accordion_bt");

    tl.to(accordionTop, { height: "auto", marginTop: "1em" });
    tl.to(accordionIcon, { rotate: 45 }, 0);
    tl.to(
      $(this),
      {
        backgroundColor: "rgba(244, 246, 250, 1)",
        borderBottom: "1px solid #F4F6FA"
      },
      0
    );

    $(this).on("click", function () {
      $(".c-accordion-2.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}
peerAccordion();

let mm = gsap.matchMedia();

// MATCHMEDIA DESKTOP
mm.add("(min-width: 992px)", () => {
  headerScroll();
  headerDropdownDesktop();
  catalogItem();
  pageLoad();
  headerSearchDesktop();
  return () => {};
});

// // MATCHMEDIA TABLET/MOBILE
mm.add("(max-width: 991px)", () => {
  tocBlog();
  headerMobile();
  headerDropdownMobile();
  webinarMobileTopicsDropdown();
  return () => {
    window.location.reload();
  };
});