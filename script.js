document.addEventListener("DOMContentLoaded",function(){
    const maxWords= 12;
    const element= document.querySelectorAll(".video-title-limited");
    // console.log(element);
    element.forEach(ele =>{
        const content=ele.textContent;
        const words=content.trim().split(/\s+/);
        if(words.length>maxWords){
            const limitedContent = words.slice(0,maxWords).join(' ');
            ele.textContent= limitedContent+"....";
            // console.log(ele);
        }
    })
})

// side-bar hovering style-----------

const nav = document.getElementsByClassName("nav");
// console.log(nav[0]);
nav[0].addEventListener("mouseover",()=>{
    nav[0].style.overflowY="scroll";
})
nav[0].addEventListener("mouseleave",()=>{
    nav[0].style.overflowY="hidden";
})

//side bar open or close

const navslide = document.querySelector(".nav");
const navslide2 = document.querySelector(".small-nav");

const sidebarmenu = document.getElementById("sidebar-menu");
const MainContainer = document.querySelector(".main-container");
const flexVideoContainer = document.querySelector(".flex-video-container");

const flexItem = document.querySelectorAll(".flex-item");
console.log(flexItem);
sidebarmenu.addEventListener("click",function(){
    console.log(navslide.className);
    if(navslide.classList.contains("open")){
        navslide.classList.remove("open");
        navslide.classList.add("close");
        navslide2.classList.remove("close");
        navslide2.classList.add("open");

        MainContainer.style.gridTemplateColumns = "1fr  17fr";
        // flexVideoContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
        flexItem.forEach(ele =>{
            console.log(ele);
            ele.style.width="calc(25% - 10px)";
        })
      
    }else{
        navslide.classList.remove("close");
        navslide.classList.add("open");
        navslide2.classList.remove("open");
        navslide2.classList.add("close");
        MainContainer.style.gridTemplateColumns = "1fr 5fr";
        // flexVideoContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
        flexItem.forEach(ele =>{
            console.log(ele);
            ele.style.width="calc(33.33% - 10px)";
        })
      
    }
    
})

