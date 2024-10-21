// Load saved conversion type from localStorage on page load
window.onload = function () {
    const savedType = localStorage.getItem('conversionType');
    if (savedType) {
        document.getElementById("conversionType").value = savedType;
        showFields();  // Show the appropriate fields based on saved value
    }

    // Add event listeners for "Enter" key presses
    document.getElementById("fontSize").addEventListener("keydown", function (e) {
        if (e.key === "Enter") calculateLetterSpacing();
    });

    document.getElementById("letterSpacing").addEventListener("keydown", function (e) {
        if (e.key === "Enter") calculateLetterSpacing();
    });

    document.getElementById("remValue").addEventListener("keydown", function (e) {
        if (e.key === "Enter") convertRemToPx();
    });

    document.getElementById("emValue").addEventListener("keydown", function (e) {
        if (e.key === "Enter") convertEmToPx();
    });
};

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
        document.getElementById("result").innerText = 
            `Letter Spacing: ${letterSpacingInPixels.toFixed(2)} pixels`;
    } else {
        document.getElementById("result").innerText = "Please enter valid values.";
    }
}

function convertRemToPx() {
    const remValue = parseFloat(document.getElementById("remValue").value);
    const baseFontSize = 16; // Assuming the base font size is 16px

    if (!isNaN(remValue)) {
        const pxValue = remValue * baseFontSize;
        document.getElementById("remResult").innerText = 
            `${remValue} rem = ${pxValue.toFixed(2)} px`;
    } else {
        document.getElementById("remResult").innerText = "Please enter a valid rem value.";
    }
}

function convertEmToPx() {
    const emValue = parseFloat(document.getElementById("emValue").value);
    const baseFontSize = 16; // Assuming the base font size is 16px

    if (!isNaN(emValue)) {
        const pxValue = emValue * baseFontSize;
        document.getElementById("emResult").innerText = 
            `${emValue} em = ${pxValue.toFixed(2)} px`;
    } else {
        document.getElementById("emResult").innerText = "Please enter a valid em value.";
    }
}
