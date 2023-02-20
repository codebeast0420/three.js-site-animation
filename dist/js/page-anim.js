//page-anim.js
//iife version of basic animation and navigation (without History API)
// import { aniBack } from "./animation_back";
// import gsap from "gsap";
// import wrap from "./wrap.js";

var app = (function(){
    let pages = [];
    let links = [];
    
    document.addEventListener("DOMContentLoaded", function(){
        pages = document.querySelectorAll('[data-page]');
        links = document.querySelectorAll('[data-role="link"]');
        console.log('links', links);
        //pages[0].className = "active";  - already done in the HTML
        [].forEach.call(links, function(link){
            link.addEventListener("click", navigate)
        });

        video_link = document.getElementById("video-link");
        mycanvas = document.getElementById("container");

        console.log('video link',video_link);

        video_link.addEventListener('click', video_handler);

        // document.addEventListener('click', windowHanlder);
        mycanvas.addEventListener('click', windowHanlder);

    });
    function windowHanlder(e) {

        // let detail_scene =  document.getElementById("detail-scene");
        // detail_scene.style.opacity = '1';
        console.log("mycanvas");
        detailButtonAni();
        // window.location.href="other.html";
      }
    function navigate(ev){
        // alert('hi');
        console.log(ev.currentTarget);
        // window.image_path = "img/image-3.jpg";

        sessionStorage.setItem('image_path', ev.currentTarget.getAttribute('src'));

        // window.location.href="other.html";

        ev.preventDefault();
        
        // let id = ev.currentTarget.href.split("#")[1];
        // console.log('id', id);
        // alert('hi');
        // [].forEach.call(pages, function(page){
        //    if(page.id ===id){
        //        page.classList.add('active');
        //    }else{
        //        page.classList.remove('active');
        //    } 
        // });
        return false;
    }
    function video_handler(ev)
    {
        ev.preventDefault();

        // window.location.href="other.html";
        detailButtonAni();
        console.log('video link');

        return false;
    }
    const button = document.querySelector('#back2main');

    button.addEventListener('click', function(e) {
        // Your code to handle the click event goes here
        console.log('Button clicked!');
        // aniBack();
        backAnimation();
    });
    function detailButtonAni(){

        window.rotatePlane(false);
        window.scene_name = "detail";
        // return;

        const myImage = document.getElementById("selected_image");
        const myback = document.querySelector('#detail-scene');

        myImage.src = sessionStorage.getItem('image_path');
       
        gsap.to(myback, { 
            duration : 1.0 , 
            background : sessionStorage.getItem('back_color'),
            ease: 'expo.inOut',
        });
        // myback.style.background = sessionStorage.getItem('back_color');


        var tl_detail = gsap.timeline({});
        // console.log('gsap', gsap);

        // gsap.to("#flash-image", {x: 100, duration: 1.0});

        tl_detail.pause();

        tl_detail.set('#detail-scene', {
            display: 'block',
            opacity : 1,
            transformOrigin: 'center left',

        }).to('#detail-scene', 0.6, {
            scaleX: 1,
            ease: 'expo.inOut',
            stagger: 0.1,
        });

        tl_detail.play(0);

        const img = document.querySelector('#selected_image');
        img.classList.remove('auto_hover');

        setTimeout(function(){
            const img = document.querySelector('#selected_image');
            img.classList.add('auto_hover');
        }, 500);

    }
    function backAnimation()
    {
      
        window.scene_name = "main";

        console.log('timeline');
        var tl = gsap.timeline({});
        console.log('gsap', gsap);

        // gsap.to("#flash-image", {x: 100, duration: 1.0});

        tl.pause();
        tl.set('#flash-detail', {
            display: 'block',
            opacity : 1,
        }).to('#flash-detail', 0.1, {
            scaleX: 1,
            ease: 'expo.inOut',
            stagger: 0.1,
        }).set('#flash-detail', {
            transformOrigin: 'center left',
        }).to('#flash-detail', 0.3, {
            scaleX: 0,
            ease: 'expo.inOut',
            stagger: -0.1,
        }).set('#flash-detail', {
            display: 'none',
        }).set('#detail-scene', {
            display : 'block'
        }).set('#detail-scene', {
            transformOrigin: 'center left',
        }).to('#detail-scene', 0.6,  {
            scaleX: 0,
            ease: 'expo.inOut',
            stagger: -0.1,
            onComplete : ()=>{
                 gsap.set("#container", {
                    zIndex : 100,
                });
            }
        });

        tl.play(0);

        window.rotatePlane(true);
       
    }
    return {
        pages,
        links,
        // xhr: ajax
    }
})();

//the navigate method is private inside our iife
//the variables pages and links are public and can be accessed as app.pages or app.links