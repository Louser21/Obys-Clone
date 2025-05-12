CustomEase.create(
  "custom",
  "M0,0 C0.217,0.002 0.271,0.494 0.44,0.706 0.559,0.854 0.698,0.923 0.828,0.968 0.884,0.987 0.919,1 1,1 "
);
function scrollTrig() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loaderAnime() {
  const loader = gsap.timeline();

  // Step 1: Animate text lines
  loader.from(
    ".line h1",
    {
      y: 150,
      duration: 0.6,
      stagger: 0.3,
    },
    "+=0.7"
  );

  // Step 2: Counter grow
  loader.from(
    "#l1p1",
    {
      opacity: 0,
      duration: 2.4,
      ease: "power2.out",
      onStart: () => {
        const h5 = document.querySelector("#l1p1 h5");
        let grow = 0;
        const interval = setInterval(() => {
          if (grow < 100) {
            h5.innerHTML = grow++;
          } else {
            h5.innerHTML = grow;
            clearInterval(interval);
          }
        }, 20);
      },
    },
    "<"
  );

  // Step 3: Custom animation text
  loader.to(
    "#l4p1 h2",
    {
      animationName: "change",
      opacity: 1,
    },
    "-=0.5"
  );

  // Step 4: Loader exit
  loader.to(
    "#loader",
    {
      opacity: 0,
      duration: 0.8,
    },
    "+=1.5"
  );

  loader.to(
    "#loader",
    {
      y: -1200,
      ease: "expo.in",
    },
    "<"
  );

  loader.from(
    "#page1",
    {
      opacity: 1,
    },
    ">"
  );

  loader.set("#loader", {
    display: "none",
  });

  return loader;
}
function cursor() {
  const moveX = gsap.quickTo("#crsr", "left", {
    duration: 0.1,
    ease: "power3.out",
  });
  const moveY = gsap.quickTo("#crsr", "top", {
    duration: 0.1,
    ease: "power3.out",
  });

  document.addEventListener("mousemove", (e) => {
    moveX(e.clientX);
    moveY(e.clientY);
  });
}
function magnet() {
  Shery.makeMagnet("#nav-sub .links,#page1 .logo");
}
function page1() {
  const entry = gsap.timeline();

  entry.from(".hero h1", {
    y: 150,
    duration: 0.6,
    stagger: 0.2,
    scrub: true,
    ease: "custom",
  });

  return entry;
}

gsap.from("#hr", {
  x: "100vw",
  scrollTrigger: {
    trigger: "#hr",
    start: "top 100%",
    end: "top 80%",
    scrub: true,
  },
});

scrollTrig();

const master = gsap.timeline({ ease: "expo.out" });
master.add(loaderAnime());
master.add(page1(), "-=1");
cursor();
magnet();

window.onbeforeunload = () => window.scrollTo(0, 0);

setTimeout(() => {
  document.body.classList.remove("noscroll");
}, 5000);
