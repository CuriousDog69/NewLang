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

// Event listener for input field (when the user presses Enter)
document.getElementById('inputField').addEventListener('keydown', async function (e) {
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

document.getElementById('greenButton').addEventListener('click', async function () {
    const userInput = document.getElementById('inputField').value;
    let convertedText;
    if (userInput.split(".").length + userInput.split("|").length > 4) {
        convertedText = decode(userInput);
    } else {
        convertedText = encode(userInput);
    }
    navigator.clipboard.writeText(convertedText)
  .then(() => {
    console.log("Text copied to clipboard!");
  })
  .catch(err => {
    console.error("Failed to copy: ", err);
  });

});
