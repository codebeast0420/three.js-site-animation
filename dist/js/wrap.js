
import Sketch from "./sketch.js";
// import gsap from "gsap";

var sketch = new Sketch({
  dom: document.getElementById("container"),
});

var element_body = document.querySelector('body');
var element_leftpart = document.querySelector('#id-left-part');

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 5.5;//
let rounded = 0;

window.scene_name == "main";/////////////////////////////////////////


document.querySelector("#block");
document.querySelector("#wrap");
let elems = [...document.querySelectorAll(".n")];


window.addEventListener("wheel", (e) => {
  if(window.scene_name == "main"){
    speed += e.deltaY * 0.0003;
    // console.log('attract to', attractTo);
    updateAttractNumber();
  }
  
});
function updateAttractNumber()
{
  console.log('position', position);

  attractTo = Math.round(position);/////////////////////////////////////////////////
  
  let nav_element = document.querySelectorAll('[data-nav="' + attractTo + '"]')[0];
  sessionStorage.setItem('image_path', nav_element.getAttribute('src'));
  sessionStorage.setItem('back_color', nav_element.getAttribute('data-clr'));
  if (!attractMode) {
    // element_body.style.background = nav_element.getAttribute('data-clr');
    gsap.to(element_body, { 
      duration : 1.0 , 
      background : sessionStorage.getItem('back_color'),
      ease: 'elastic.out',
  });
  }
}
let objs = Array(7).fill({ dist: 0 });

function raf() {

  position += speed;
  speed *= 0.8;// 0.8
  
  if(position < 0) position = 0;
  if(position > 6.0) position = 6.0;////////////////////////////////////////////////////

  // updateAttractNumber();

  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist ** 2;
    elems[i].style.transform = `scale(${1 + 0.2 * o.dist})`;

    let scale = 1 + 0.0001 * o.dist;
    sketch.meshes[i].position.y = i * 1.0 - position * 1.0;
    sketch.meshes[i].scale.set(scale, scale, scale);
    sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
    
  });

  rounded = Math.round(position);
  //   console.log(position);

  let diff = rounded - position;

  if (attractMode) {
    position += -(position - attractTo) * 0.05;
  } else {
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;

    //   block.style.transform = `translate(0, ${-position * 100 + 50}px)`;
    wrap.style.transform = `translate(0, ${-position * 100 + 50}px)`;
    
  }

  window.requestAnimationFrame(raf);
}

function rotatePlane(flag) {
  if (flag) {

      gsap.to(rots, {duration: 0.5, x: -0.5, y: -0.3, z: -0.2,});
      gsap.to(trans, { duration: 0.3, x: 0, y: 0, z: 0, });

      console.log('come back', attractTo);

  } else {
    
    gsap.set("#container", {
      zIndex : 320,
    });
    gsap.to(rots, {duration: 0.3, x: 0, y: 0,  z: 0, });
    gsap.to(trans, {duration: 0.3,x: -0.5, y: 0, z: 0,});
   
  }
}


window.sketch = sketch;
window.rotatePlane = rotatePlane;

let navs = [...document.querySelectorAll("li")];
let nav = document.querySelector(".nav");
let rots = sketch.groups.map((e) => e.rotation);
console.log('trans', sketch.groups.map((e) => e.position));
let trans = sketch.groups.map((e) => e.position);

console.log(rots);

// console.log('nav', nav);

nav.addEventListener("mouseenter", () => {
  
  attractMode = true;

  gsap.to(rots, {duration: 0.3, x: 0, y: 0,  z: 0, });
  gsap.to(trans, {duration: 0.3,x: -0.5, y: 0, z: 0,});

  element_body.style.background = 'black';
  element_leftpart.style.display = 'none';

  var tl = gsap.timeline({});
  tl.pause();
  
  tl.set(navs, {
      color: 'transparent',
    })
    .to(".nav li span", {
      transform: "skew(-20deg)",
      duration: 0.1,
    })
    .to(".nav li span", {
      width: "200px",
      duration: 0.2,
    })
    .to(".nav li span", {
      width: "10px",
      duration: 0.2,
      onComplete: () => {
        navs.forEach((li) => {
          li.style.color = '#d1d1d1';
        });
      },
    })
    .to(".nav li span", {
      transform: "skew(0deg)",
      duration: 0.1,
    });
  tl.play(0);
});
nav.addEventListener("mouseleave", () => {

  var tl = gsap.timeline({});
  tl.pause();

  tl.set(".nav li", {
    color: 'transparent',
  })
  .to(".nav li span", {
    transform: "skew(-20deg)",
    duration: 0.1,
  })
  .to(".nav li span", {
    width: "150px",
    duration: 0.2,
  })
  .to(".nav li span", {
    width: "10px",
    duration: 0.1,
    onComplete: () => {

      attractMode = false;
      gsap.to(rots, {duration: 0.5, x: -0.5, y: -0.3, z: -0.2,});
      gsap.to(trans, { duration: 0.3, x: 0, y: 0, z: 0, });
    
      // element_body.style.background = '#7AB9E0';
      let nav_element = document.querySelectorAll('[data-nav="' + attractTo + '"]')[0];
      element_body.style.background = nav_element.getAttribute('data-clr');
      element_leftpart.style.display = 'block';

    },
  })
  .to(".nav li span", {
    transform: "skew(0deg)",
    duration: 0.1,
  });

  tl.play(0);
 
});
navs.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    attractTo = Number(e.target.getAttribute("data-nav"));
    console.log(attractTo);
    sessionStorage.setItem('image_path', e.currentTarget.getAttribute('src'));
    sessionStorage.setItem('back_color', e.currentTarget.getAttribute('data-clr'));

  });
});


// raf();
export { raf };
