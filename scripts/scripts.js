// This places the JS in strict mode which will throw errors when the code
// isn't written properly. Helps with debugging.
// This can also be placed inside a function to make the function strict mode
"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    toggleIntros();
}

function toggleIntros(){

    let aboutMeDiv = document.querySelector("#aboutMe");
    let longIntroButton = aboutMeDiv.querySelector("#long-intro-button > p > span");
    let tldrIntroButton = aboutMeDiv.querySelector("#tldr-intro-button > p > span");

    let introDivs = [];
    introDivs.push(longIntroButton.parentElement.parentElement.nextElementSibling);
    introDivs.push(tldrIntroButton.parentElement.parentElement.nextElementSibling);

    let handleClick = {
        handleEvent(object) {
            let target = object.target;
            let belowDiv = target.parentElement.parentElement.nextElementSibling;

            if (belowDiv.classList.contains("hidden")){
                belowDiv.classList.remove("hidden");
            }else{
                belowDiv.classList.add("hidden");
            }

            for (const node of introDivs) {
                if (node !== belowDiv) {
                    if (!node.classList.contains("hidden")){
                        node.classList.add("hidden");
                    }
                }
            }

        }
    }

    longIntroButton.addEventListener("click", handleClick);
    tldrIntroButton.addEventListener("click", handleClick);
}