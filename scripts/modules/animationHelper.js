// This places the JS in strict mode which will throw errors when the code
// isn't written properly. Helps with debugging.
// This can also be placed inside a function to make the function strict mode
"use strict";
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
 * Toggles the specified class on the targetDiv. Will also remove the specified class from any other divs that are
 * passed as a list of div elements. This is mainly useful for toggling a "hidden" class on elements.
 *
 * @param classToToggle the string value of the class to toggle
 * @param targetDiv the div element that will need toggling of the class provided
 * @param otherDivList a list of other div elements that will also be given the class, if they don't already have it.
 */
function reverseToggleClasses(classToToggle, targetDiv, otherDivList = []) {
    if (targetDiv.classList.contains(classToToggle)) {
        targetDiv.classList.remove(classToToggle);
    } else {
        targetDiv.classList.add(classToToggle);
    }

    for (const node of otherDivList) {
        if (node !== targetDiv) {
            if (node.classList.contains(classToToggle)) {
                node.classList.remove(classToToggle);
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

export {toggleClasses, reverseToggleClasses, toggleAnimationsOnScroll};


