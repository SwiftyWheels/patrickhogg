// This places the JS in strict mode which will throw errors when the code
// isn't written properly. Helps with debugging.
// This can also be placed inside a function to make the function strict mode
"use strict";

function equalHeights(elements) {
    let largestHeight = 0;

    for (const element of elements) {
        if (element.clientHeight > largestHeight) {
            largestHeight = element.clientHeight;
        }
    }

    for (const element of elements) {
        element.style.height = largestHeight + "px";
    }
}

export {equalHeights};
