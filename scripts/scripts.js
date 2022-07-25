// This places the JS in strict mode which will throw errors when the code
// isn't written properly. Helps with debugging.
// This can also be placed inside a function to make the function strict mode
"use strict";

// Call the init function once the dom has loaded fully
document.addEventListener("DOMContentLoaded", init);

// This will be called once the dom has loaded fully
function init() {
    // Handles the about me "click me" buttons
    handleAboutMeToggles();


    let mainDivs = document.querySelectorAll("main > div");
    toggleAnimationsOnScroll(mainDivs, "fade-in-no-delay");
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
            toggleClasses("hidden", belowDiv, introDivs);
        }
    }

    // Add the handleClick event handler to both intro buttons
    longIntroButton.addEventListener("click", handleClick);
    tldrIntroButton.addEventListener("click", handleClick);
}

/**
 * Toggles the specified class on the targetDiv. Will also remove the specified class from any other divs that are
 * passed as a list of div elements. This is mainly useful for toggling a "hidden" class on elements.
 *
 * @param classToToggle the string value of the class to toggle
 * @param targetDiv the div element that will need toggling of the class provided
 * @param otherDivList a list of other div elements that will also be given the class, if they don't already have it.
 */
function toggleClasses(classToToggle, targetDiv, otherDivList = []) {
    if (targetDiv.classList.contains(classToToggle)) {
        targetDiv.classList.remove(classToToggle);
    } else {
        targetDiv.classList.add(classToToggle);
    }

    for (const node of otherDivList) {
        if (node !== targetDiv) {
            if (!node.classList.contains(classToToggle)) {
                node.classList.add(classToToggle);
            }
        }
    }
}

/**
 * Adds an observer to the specified elements to allow toggling of animations once the viewport is intersecting
 * the given elements.
 * @param elementsToAddAnimation The list of elements to add the observer to
 * @param animationClass The animation class to add to the elements
 */
function toggleAnimationsOnScroll(elementsToAddAnimation, animationClass) {
    for (const element of elementsToAddAnimation) {
        scrollObserver(element, animationClass);
    }
}

/**
 * Adds an observer to the specified element. This observer will toggle an animation class if it sees that the viewport
 * is intersecting.
 * @param observedElement The element to add the observer to
 * @param animationClass The animation class to add to the observed element
 * @param observedElementWrapper An optional "wrapper" of the element. This will also observe the "wrapper" element of
 * the desired observed element.
 */
function scrollObserver(observedElement, animationClass, observedElementWrapper = null) {
    observedElement.classList.remove(animationClass);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observedElement.classList.add(animationClass);
            } else {
                observedElement.classList.remove(animationClass);
            }
        });
    });

    if (observedElementWrapper !== null) {
        observer.observe(observedElementWrapper);
    } else {
        observer.observe(observedElement);
    }
}