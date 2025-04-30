const loader = gsap.timeline();

loader.from(
  ".line h1",
  {
    y: 150,
    duration: 0.6,
    stagger: 0.3,
  },
  "+=0.7"
);
loader.from(
  "#l1p1",
  {
    ease: "power2.out",
    opacity: 0,
    duration: 2.4,
    onStart: function () {
      const h5Counter = document.querySelector("#l1p1 h5");
      let grow = 0;

      setInterval(() => {
        if (grow < 100) {
          h5Counter.innerHTML = grow++;
        } else {
          h5Counter.innerHTML = grow;
        }
      }, 20);
    },
  },
  "<"
);

loader.to("#l4p1 h2",{
    animationName: 'change',
    opacity: 1,
},'-=0.5')

const entry = gsap.timeline();

entry.to("#loader", {
  opacity: 0,
  duration: 0.8,
  delay: 3.5,
});
entry.from("#page1", {
  y: 1200,
  opacity: 0,
});

entry.to("#loader", {
  display: none,
});
