function encode(input) {
    const characters = [
        ".....", "....|", "...|.", "...||", "..|..", "..|.|", "..||.", "..|||", ".|...", ".|..|", ".|.|.",
        ".|.||", ".||..", ".||.|", ".|||.", ".||||", "|....", "|...|", "|..|.", "|..||", "|.|..", "|.|.|",
        "|.||.", "|.|||", "||...", "||..|"
    ];

    let output = "";
    let letters = input.split('');// Split input into individual characters
    return input;
    //const logDiv = document.createElement('div');
    //logDiv.textContent = letters;
    for (const letter of letters) {
        let index = letter.toLowerCase().charCodeAt(0) - 97;  // Get index for lowercase letters 'a' to 'z'

        if (index >= 0 && index <= 25) {
            // If the character is a valid letter (a-z)
            output += characters[index] + ' ';  // Map to corresponding character
        } else if (letter === ' ') {
            // If the character is a space, ads more spaces
            output += "   ";
        }  else {
            // For other non-alphabet characters, just append them as is
            output += letter;
        }
    }

    //return output;
}

function evaluateCustomChar(input) {
    let value = 0;
    let chars = input.split('');
    let index = 0;
    for (const char of chars) {
        if (char === '|') {
            value += 2 ** (4 - index);
            index ++;
        } else if (char === '.') {
            index ++;
        }
    }
    if (index != 0) {
        if (value === 31) {return "\n";}
        return String.fromCharCode(value + 97);
    } 
    return "";
}

function decode(input) {
    let words = input.split("   ");
    let output = "";
    for (const word of words) {
        let customChars = word.split(' ');
        for (const char of customChars) { 
            output += evaluateCustomChar(char);
        }
        output += " ";
    }
    return output;
}

// Event listener for input field (when the user presses Enter)
document.getElementById('inputField').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();  // Prevent the default Enter behavior (e.g., submitting a form)
        const userInput = this.value;  // Get the value from the input field
        //Message is more | or . than not so we assume the user wants to decode
        let convertedText;
        if  (false ) {//(userInput.split(".").length + userInput.split("|").length > userInput.length / 2) {
            convertedText = decode(userInput);
        } else {
            convertedText = encode(userInput);  // Convert the input text
        }
        document.getElementById('bottomText').textContent = convertedText;  // Output converted text to the bottom panel
    }
});
