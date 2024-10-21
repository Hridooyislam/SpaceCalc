// Load saved conversion type from localStorage on page load
window.onload = function () {
    const savedType = localStorage.getItem('conversionType');
    if (savedType) {
        document.getElementById("conversionType").value = savedType;
        showFields();  // Show the appropriate fields based on saved value
    }

    // Attach 'keydown' event listener to input fields for Enter key detection
    document.getElementById("fontSize").addEventListener("keydown", handleKeyPress);
    document.getElementById("letterSpacing").addEventListener("keydown", handleKeyPress);
    document.getElementById("remValue").addEventListener("keydown", handleKeyPress);
    document.getElementById("emValue").addEventListener("keydown", handleKeyPress);
};

function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        const conversionType = document.getElementById("conversionType").value;
        if (conversionType === "letterSpacing") {
            calculateLetterSpacing();
        } else if (conversionType === "remToPx") {
            convertRemToPx();
        } else if (conversionType === "emToPx") {
            convertEmToPx();
        }
    }
}

function showFields() {
    const conversionType = document.getElementById("conversionType").value;

    // Save the selected conversion type in localStorage
    localStorage.setItem('conversionType', conversionType);

    // Hide all fields initially
    document.getElementById("letterSpacingFields").style.display = "none";
    document.getElementById("remFields").style.display = "none";
    document.getElementById("emFields").style.display = "none";

    // Show relevant fields based on selection
    if (conversionType === "letterSpacing") {
        document.getElementById("letterSpacingFields").style.display = "block";
    } else if (conversionType === "remToPx") {
        document.getElementById("remFields").style.display = "block";
    } else if (conversionType === "emToPx") {
        document.getElementById("emFields").style.display = "block";
    }
}

function calculateLetterSpacing() {
    const fontSize = parseFloat(document.getElementById("fontSize").value);
    const letterSpacingPercent = parseFloat(document.getElementById("letterSpacing").value);

    if (!isNaN(fontSize) && !isNaN(letterSpacingPercent)) {
        const letterSpacingInPixels = fontSize * (letterSpacingPercent / 100);
        const formattedResult = `${letterSpacingInPixels >= 0 ? '+' : ''}${letterSpacingInPixels.toFixed(2)} pixels`;
        document.getElementById("result").innerText = 
            `Letter Spacing: ${formattedResult}`;
    } else {
        document.getElementById("result").innerText = "Please enter valid values.";
    }
}

function convertRemToPx() {
    const remValue = parseFloat(document.getElementById("remValue").value);
    const baseFontSize = 16; // Assuming the base font size is 16px

    if (!isNaN(remValue)) {
        const pxValue = remValue * baseFontSize;
        const formattedResult = `${pxValue >= 0 ? '+' : ''}${pxValue.toFixed(2)} px`;
        document.getElementById("remResult").innerText = 
            `${remValue} rem = ${formattedResult}`;
    } else {
        document.getElementById("remResult").innerText = "Please enter a valid rem value.";
    }
}

function convertEmToPx() {
    const emValue = parseFloat(document.getElementById("emValue").value);
    const baseFontSize = 16; // Assuming the base font size is 16
    
    if (!isNaN(emValue)) {
        const pxValue = emValue * baseFontSize;
        const formattedResult = `${pxValue >= 0 ? '+' : ''}${pxValue.toFixed(2)} px`;
        document.getElementById("emResult").innerText = 
            `${emValue} em = ${formattedResult}`;
    } else {
        document.getElementById("emResult").innerText = "Please enter a valid em value.";
    }
}

function copyToClipboard(resultId) {
    const resultText = document.getElementById(resultId).innerText;
    const numberPart = resultText.match(/[-+]?\d+(\.\d+)?/); // Match the number including + or -
    
    if (numberPart) {
        navigator.clipboard.writeText(numberPart[0])
            .then(() => {
                alert(`Copied: ${numberPart[0]}`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        alert('No number to copy!');
    }
}
