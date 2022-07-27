// This places the JS in strict mode which will throw errors when the code
// isn't written properly. Helps with debugging.
// This can also be placed inside a function to make the function strict mode
"use strict";

import * as animationHelper from "./modules/animationHelper.js";

// Call the init function once the dom has loaded fully
document.addEventListener("DOMContentLoaded", init);

// This will be called once the dom has loaded fully
function init() {
    // Handles the about me "click me" buttons
    handleAboutMeToggles();
    handleResumeToggles();

    // Grab the divs inside the main element
    let oddDivs = document.querySelectorAll("main > div:nth-child(odd)");
    let evenDivs = document.querySelectorAll("main > div:nth-child(even)");

    // Handles the toggling of animations when scrolling by
    animationHelper.toggleAnimationsOnScroll(oddDivs, "slide-in-from-left");
    animationHelper.toggleAnimationsOnScroll(evenDivs, "slide-in-from-right");

    let skillsItems = document.querySelectorAll("#resumeSkillsSection ul > li, h4");

    animationHelper.toggleAnimationsOnScroll(skillsItems, "fade-in-no-delay");
}

/**
 * Handles the "Click Me" buttons in the About Me section.
 */
function handleAboutMeToggles() {
    // Grabs the about me element
    let aboutMeDiv = document.querySelector("#aboutMe");
    // Gets the longIntro span
    let longIntroButton = aboutMeDiv.querySelector("#long-intro-button > p > span");
    // Gets the tldrIntro span
    let tldrIntroButton = aboutMeDiv.querySelector("#tldr-intro-button > p > span");

    // Adds the parents, parent next element sibling to the array of divs for each intro button
    let introDivs = [];
    // span > parent = p > parent = long-intro div
    introDivs.push(longIntroButton.parentElement.parentElement.nextElementSibling);
    // span > parent = p > parent = tldr-intro div
    introDivs.push(tldrIntroButton.parentElement.parentElement.nextElementSibling);

    // The handle click method that will be used when either
    let handleClick = {
        handleEvent(event) {
            // Get the target of the event
            let target = event.target;
            // Get the div that is directly below the target
            let belowDiv = target.parentElement.parentElement.nextElementSibling;

            // Toggle the hidden class of the below div and any other intro divs that may be open.
            animationHelper.toggleClasses("hidden", belowDiv, introDivs);
        }
    }

    // Add the handleClick event handler to both intro buttons
    longIntroButton.addEventListener("click", handleClick);
    tldrIntroButton.addEventListener("click", handleClick);
}

function handleResumeToggles() {
    let resumeSectionDivs = document.querySelectorAll("#myResume > div:not(.header, .resume-nav) > div");
    let resumeButtonsNav = document.querySelectorAll(".resume-nav .nav-dropdown .button");
    let resumeButtons = document.querySelectorAll(".resume-nav .nav-regular .button");
    let allButtons = joinArrays(resumeButtonsNav, resumeButtons);


    console.log(allButtons);


    let handleClick = {
        handleEvent(event) {
            let target = event.target;

            //todo: Fix animations in skills section when loading.
            if (!target.classList.contains("button-selected")){
                for (let i = 0; i < resumeButtonsNav.length; i++) {
                    if (resumeButtonsNav[i] === target) {
                        animationHelper.toggleClasses("hidden", resumeSectionDivs[i], resumeSectionDivs);
                        animationHelper.reverseToggleClasses("button-selected", target, allButtons);
                        resumeButtons[i].classList.add("button-selected");
                        break;
                    }
                }
                for (let i = 0; i < resumeButtons.length; i++) {
                    if (resumeButtons[i] === target) {
                        animationHelper.toggleClasses("hidden", resumeSectionDivs[i], resumeSectionDivs);
                        animationHelper.reverseToggleClasses("button-selected", target, allButtons);
                        resumeButtonsNav[i].classList.add("button-selected");
                        break;
                    }
                }
            }

        }
    }

    resumeButtonsNav.forEach(button => button.addEventListener("click", handleClick));
    resumeButtons.forEach(button => button.addEventListener("click", handleClick));
}

function joinArrays(firstArray, secondArray) {
    let joinedArrays = []
    for (const firstArrayElement of firstArray) {
        joinedArrays.push(firstArrayElement);
    }
    for (const secondArrayElement of secondArray) {
        joinedArrays.push(secondArrayElement);
    }
    return joinedArrays;
}