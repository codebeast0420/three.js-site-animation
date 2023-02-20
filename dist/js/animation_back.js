// import gsap from "gsap";
var tl = gsap.timeline({});
console.log('gsap', gsap);

gsap.to("#flash-image", {x: 100, duration: 1});

tl.pause();
tl.set('.loader', {
    display: 'block'
}).set('.loader__element', {
    transformOrigin: 'center right',
}).to('.loader__element', 0.6, {
    scaleX: 1,
    ease: 'expo.inOut',
    stagger: 0.1,
}).set('.loader__element', {
    transformOrigin: 'center left',
}).to('.loader__element', 0.6, {
    scaleX: 0,
    ease: 'expo.inOut',
    stagger: -0.1,
}).set('.loader', {
    display: 'none',
});

tl.play(0);

export function aniBack() {
    tl.play(0);    
}

// document.addEventListener('click', animation);