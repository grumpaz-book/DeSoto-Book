// === Dot animation and boot-sequence loading ===
const dots = document.getElementById("dots");
const bootLine = document.getElementById("boot-line");
const mainContent = document.getElementById("main-content");

let count = 0;

// This function adds a dot to the dots element every 50-150 milliseconds until
// it reaches 20 dots. After that, it calls the loadBootText function to load   
// the boot sequence data from a JSON file and display it in the boot line element.
// The dots are added with a random delay to simulate a loading effect.

function addDot() {
    if (count < 20) {
    dots.textContent += ".";
    count++;
    const delay = 50 + Math.random() * 100;
    setTimeout(addDot, delay);
    } else {
    loadBootText();
    }
}

// === Load boot-sequence.json and display lines ===
// This function fetches the boot sequence data and appends it to the boot line 
// element, simulating a terminal output.

function loadBootText() {
    fetch("data/boot-sequence.json")
    .then(res => res.json())
    .then(data => {
        data.lines.forEach(line => {
        const lineElement = document.createElement("pre");
        lineElement.textContent = line;
        bootLine.appendChild(lineElement);
        });
        mainContent.style.display = "block";
    })
    .catch(() => {
        const fallback = document.createElement("pre");
        fallback.textContent = "> ERROR LOADING BOOT DATA";
        bootLine.appendChild(fallback);
    });
}

// Start the dot animation after a short delay to allow the page to render

setTimeout(addDot, 500);