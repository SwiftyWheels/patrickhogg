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
    animationHelper.handleAboutMeToggles();

    // Grab the divs inside the main element
    let oddDivs = document.querySelectorAll("main > div:nth-child(odd)");
    let evenDivs = document.querySelectorAll("main > div:nth-child(even)");
    // Handles the toggling of animations when scrolling by
    animationHelper.toggleAnimationsOnScroll(oddDivs, "slide-in-from-left");
    animationHelper.toggleAnimationsOnScroll(evenDivs, "slide-in-from-right");

    let skillsItems = document.querySelectorAll("#resumeSkillsSection ul > li");

    animationHelper.toggleAnimationsOnScroll(skillsItems, "fade-in-no-delay");
}