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
    handleAccordions();

    // Grab the divs inside the main element
    let oddDivs = document.querySelectorAll("main > div:nth-child(odd)");
    let evenDivs = document.querySelectorAll("main > div:nth-child(even)");

    // Handles the toggling of animations when scrolling by
    animationHelper.toggleAnimationsOnScroll(oddDivs, "slide-in-from-left");
    animationHelper.toggleAnimationsOnScroll(evenDivs, "slide-in-from-right");
}

/**
 * Handles the "Click Me" buttons in the About Me section.
 */
function handleAboutMeToggles() {
    // Grabs the about me element
    let aboutMeDiv = document.querySelector("#aboutMe");
    // Grab all the buttons
    let buttonSpans = aboutMeDiv.querySelectorAll(".button");
    // Grab the intro divs
    let divs = aboutMeDiv.querySelectorAll("div.long-intro, div.tldr-intro");
    // The handle click method that will be used when either
    let handleClick = {
        handleEvent(event) {
            // Get the target of the event
            let target = event.target;
            // Get the div that is directly below the target
            let belowDiv = target.parentElement.parentElement.nextElementSibling;

            // Toggle the hidden class of the below div and any other intro divs that may be open.
            animationHelper.toggleClasses("hidden", belowDiv, divs);
            animationHelper.reverseToggleClasses("button-selected", target, buttonSpans);
        }
    }

    // Add the handleClick event handler to both intro buttons
    buttonSpans.forEach(button => button.addEventListener("click", handleClick));
}

function handleResumeToggles() {
    let resumeSectionDivs = document.querySelectorAll("#myResume > div:not(.header, .resume-nav) > div");
    let resumeButtonsNav = document.querySelectorAll(".resume-nav .nav-dropdown .button");
    let resumeButtons = document.querySelectorAll(".resume-nav .nav-regular .button");
    let allButtons = joinArrays(resumeButtonsNav, resumeButtons);

    let handleClick = {
        handleEvent(event) {
            let target = event.target;

            if (!target.classList.contains("button-selected")) {
                for (let i = 0; i < resumeButtonsNav.length; i++) {
                    if (resumeButtonsNav[i] === target) {
                        animationHelper.toggleClasses("hidden", resumeSectionDivs[i], resumeSectionDivs);
                        animationHelper.reverseToggleClasses("fade-in-no-delay", resumeSectionDivs[i], resumeSectionDivs);
                        animationHelper.reverseToggleClasses("button-selected", target, allButtons);
                        resumeButtons[i].classList.add("button-selected");
                        break;
                    }
                }
                for (let i = 0; i < resumeButtons.length; i++) {
                    if (resumeButtons[i] === target) {
                        animationHelper.toggleClasses("hidden", resumeSectionDivs[i], resumeSectionDivs);
                        animationHelper.reverseToggleClasses("fade-in-no-delay", resumeSectionDivs[i], resumeSectionDivs);
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

function handleAccordions() {
    let accordions = document.getElementsByClassName("accordion-container");

    for (const accordion of accordions) {
        let accordionTitle = accordion.querySelector(".accordion-title");
        accordionTitle.addEventListener("click", function () {
            let accordionContent = accordionTitle.nextElementSibling;
            let contentChildren = accordionContent.children;
            let scrollHeight = 0;

            animationHelper.reverseToggleClasses("accordion-selected", this);
            for (let contentChild of contentChildren) {
                scrollHeight += contentChild.scrollHeight + 100;
                console.log(scrollHeight);
            }
            console.log(contentChildren);
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
                accordionContent.classList.remove("border-black");
                accordionContent.style.padding = null;
                accordionContent.style.opacity = null;
            } else {
                accordionContent.style.maxHeight = scrollHeight + "px";
                accordionContent.classList.add("border-black");
                accordionContent.style.padding = "10px";
                accordionContent.style.opacity = "100%";
            }
        })
    }
}

/**
 * Joins any amount of array objects. They should be of the same type, but this will work with any type.
 * @param arrays the arrays that you wish to join.
 * @returns {*[]} An array that contains the joined arrays.
 */
function joinArrays(...arrays) {
    let joinedArrays = []
    for (const array of arrays) {
        for (const arrayElement of array) {
            joinedArrays.push(arrayElement);
        }
    }
    return joinedArrays;
}