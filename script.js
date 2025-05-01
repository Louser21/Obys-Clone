CustomEase.create("custom", "M0,0 C0.217,0.002 0.271,0.494 0.44,0.706 0.559,0.854 0.698,0.923 0.828,0.968 0.884,0.987 0.919,1 1,1 ")
function loaderAnime() {
  const loader = gsap.timeline();

  // Step 1: Animate text lines
  loader.from(".line h1", {
    y: 150,
    duration: 0.6,
    stagger: 0.3
  }, "+=0.7");

  // Step 2: Counter grow
  loader.from("#l1p1", {
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
    }
  }, "<");

  // Step 3: Custom animation text
  loader.to("#l4p1 h2", {
    animationName: "change",
    opacity: 1
  }, "-=0.5");

  // Step 4: Loader exit
  loader.to("#loader", {
    opacity: 0,
    duration: 0.8
  }, "+=1.5");

  loader.to("#loader", {
    y: -1200,
    ease: "power4.in"
  }, "<");

  loader.from("#page1", {
    opacity: 0
  }, ">");

  loader.set("#loader", {
    display: "none"
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
  Shery.makeMagnet("#nav-sub .links,a");
}

function page1(){
  const entry = gsap.timeline();
  

  entry.from('.hero h1',{
    y:150,
    duration: 0.6,
    stagger: 0.2,
    scrub: 4,
    ease: 'custom',
  })

  return entry;
}


const master = gsap.timeline({ease: 'custom'});
master.add(loaderAnime());
master.add(page1(),'-=0.6')
cursor();
magnet();
