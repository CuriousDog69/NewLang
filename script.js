function encode(input) {
    const characters = [".....", "....|", "...|.", "...||", "..|..", "..|.|", "..||.", "..|||", ".|...", ".|..|", ".|.|.", ".|.||", ".||..", ".||.|", ".|||.", ".||||", "|....", "|...|", "|..|.", "|..||", "|.|..", "|.|.|", "|.||.", "|.|||", "||...", "||..|"];

    let output = "";
    let letters = input.split("");
    const logDiv = document.createElement("div");
    logDiv.textContent = letters;
    for (const letter of letters) {
        let index = letter.toLowerCase().charCodeAt(0) - 97;

        if (index >= 0 && index <= 25) {
            output += characters[index] + " ";
        } else if (letter === " ") {
            output += "   ";
        } else {
            output += letter;
        }
    }

    return output;
}

function evaluateCustomChar(input) {
    let value = 0;
    let chars = input.split("");
    let index = 0;
    for (const char of chars) {
        if (char === "|") {
            value += 2 ** (4 - index);
            index++;
        } else if (char === ".") {
            index++;
        }
    }
    if (index != 0) {
        if (value === 31) {
            return "\n";
        }
        return String.fromCharCode(value + 97);
    }
    return "";
}

function decode(input) {
    let words = input.split("   ");
    let output = "";
    for (const word of words) {
        let customChars = word.split(" ");
        for (const char of customChars) {
            output += evaluateCustomChar(char);
        }
        output += " ";
    }
    return output;
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

document.getElementById("inputField").addEventListener("keydown", async function (e) {
    //this shit is cursed, why does removing it break ths
    await wait(1);
    const userInput = this.value;
    let convertedText;
    if (userInput.split(".").length + userInput.split("|").length > 4) {
        convertedText = decode(userInput);
    } else {
        convertedText = encode(userInput);
    }
    console.log(userInput);
    document.getElementById("bottomText").textContent = convertedText;
});

// Auto-resize textarea when content changes
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("inputField");
    const copyButton = document.getElementById("copyButton");
    const bottomText = document.getElementById("bottomText");

    // Function to adjust height automatically
    function autoResizeTextarea() {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = textarea.scrollHeight + "px"; // Set to content height
    }

    // Call on input
    textarea.addEventListener("input", autoResizeTextarea);

    // Initial call
    autoResizeTextarea();

    // Add copy button functionality
    copyButton.addEventListener("click", function () {
        // Copy the bottom text content
        navigator.clipboard
            .writeText(bottomText.textContent)
            .then(() => {
                // Provide visual feedback
                const originalText = copyButton.textContent;
                copyButton.textContent = "Copied!";
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
            });
    });
});

// Remove the duplicate event listener below
// document.getElementById("copyButton").addEventListener("click", async function () {
//     const userInput = document.getElementById("inputField").value;
//     let convertedText;
//     if (userInput.split(".").length + userInput.split("|").length > 4) {
//         convertedText = decode(userInput);
//     } else {
//         convertedText = encode(userInput);
//     }

//     navigator.clipboard.writeText(convertedText);
// });
