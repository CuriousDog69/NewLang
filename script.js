
function convert(input) {
    const characters = [".....", "....|", "...|.", "...||", "..|..", "..|.|", "..||.", "..|||", ".|...", ".|..|", ".|.|.", ".|.||", ".||..", ".||.|", ".|||.", ".||||", "|....", "|...|", "|..|.", "|..||", "|.|..", "|.|.|", "|.||.", "|.|||", "||...", "||..|"];
    let output = "";

    let letters = input.split('');
    for (const letter of letters) {
        let index = letter.toLowerCase().charCodeAt(0) - 97;

        if (index > 0 && index < 25) {
            output += characters[index] + '  ';
        } else if (letter === ' ') {
            output += '\n';
        } else {
            output += letter;
        }
    }
    return output;
}

document.getElementById('inputField').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const userInput = this.value;
        const convertedText = convert(userInput);
        document.getElementById('bottomText').textContent = convertedText;
    }
});
