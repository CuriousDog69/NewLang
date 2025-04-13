function convert(input) {
    const characters = [
        ".....", "....|", "...|.", "...||", "..|..", "..|.|", "..||.", "..|||", ".|...", ".|..|", ".|.|.",
        ".|.||", ".||..", ".||.|", ".|||.", ".||||", "|....", "|...|", "|..|.", "|..||", "|.|..", "|.|.|",
        "|.||.", "|.|||", "||...", "||..|"
    ];

    let output = "";

    let letters = input.split('');  // Split input into individual characters
    for (const letter of letters) {
        let index = letter.toLowerCase().charCodeAt(0) - 97;  // Get index for lowercase letters 'a' to 'z'

        if (index >= 0 && index <= 25) {
            // If the character is a valid letter (a-z)
            output += characters[index] + "  ";  // Map to corresponding character
        } else if (letter === ' ') {
            // If the character is a space, add a newline
            output += '\n';
        } else {
            // For other non-alphabet characters, just append them as is
            output += letter;
        }
    }

    return output;
}

// Event listener for input field (when the user presses Enter)
document.getElementById('inputField').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();  // Prevent the default Enter behavior (e.g., submitting a form)
        const userInput = this.value;  // Get the value from the input field
        const convertedText = convert(userInput);  // Convert the input text
        document.getElementById('bottomText').textContent = convertedText;  // Output converted text to the bottom panel
    }
});
