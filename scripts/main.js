// === Dot animation and boot-sequence loading ===
const dots = document.getElementById("dots");
const mainContent = document.getElementById("main-content");
const bootSequence = document.getElementById("boot-sequence");
const bootLog = document.getElementById("boot-log");

let count = 0;



/**
 * Adds a dot every 50–150ms to simulate uplink activity.
 * Once 20 dots are displayed, triggers the structured boot loader.
 */
function addDot() {
  if (count < 20) {
    dots.textContent += ".";
    count++;
    const delay = 50 + Math.random() * 100;
    setTimeout(addDot, delay);
  } else {
    // Remove the old blinking cursor from boot-line
    const oldCursor = document.querySelector("#boot-line .cursor");
    if (oldCursor) oldCursor.remove();  
    
    loadBootText(() => {
      runGarbledCascade(() => {
        bootLog.innerHTML = ""; // Clear garbled output
 
        const bootLineEl = document.getElementById("boot-line");
        if (bootLineEl) bootLineEl.remove(); //  Remove the SYNCHRONIZING UPLINK line
 
        bootSequence.style.display = "none";
        mainContent.style.display = "block";
        revealLinks();
      });
    });
  }
}

/**
 * loadBootText
 * -------------
 * Loads a series of structured boot lines from a JSON file and appends them
 * to the terminal log. Accepts a callback to proceed after loading completes.
 */
function loadBootText(callback) {
  fetch("data/boot-sequence.json")
    .then(res => res.json())
    .then(data => {
      data.lines.forEach(line => {
        const lineElement = document.createElement("pre");
        lineElement.textContent = line;
        bootLog.appendChild(lineElement);
      });
      setTimeout(callback, 400); // Brief pause before garble
    })
    .catch(() => {
      const fallback = document.createElement("pre");
      fallback.textContent = "> ERROR LOADING BOOT DATA";
      bootLog.appendChild(fallback);
    });
}

/**
 * runGarbledCascade
 * ------------------
 * Simulates a pseudo-random burst of noise after boot text completes,
 * then invokes a callback (e.g. screen reset + menu reveal).
 */
function runGarbledCascade(callback) {
  const lines = 20;
  const delay = 40;

  function typeLine(i) {
    if (i >= lines) {
        setTimeout(() => {
            const spacer = document.createElement("pre");
            spacer.textContent = "\u00A0"; // non-breaking space
            bootLog.appendChild(spacer);

            const prompt = document.createElement("pre");
            prompt.innerHTML = "> PRESS ANY KEY TO CONTINUE<span class=\"cursor\"></span>";
            bootLog.appendChild(prompt);

            window.addEventListener("keydown", () => {
            callback();
            }, { once: true });
        }, 1200); //  Adjust this delay as desired (milliseconds)
        return;

    }
    const line = document.createElement("pre");
    line.textContent = `> ${generateGarbledLine()}`;
    bootLog.appendChild(line);
    setTimeout(() => typeLine(i + 1), delay);
  }

  typeLine(0);
}

/**
 * Generates a pseudo-random "garbled" line to simulate data noise.
 */
function generateGarbledLine() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/-.';
  const len = Math.floor(Math.random() * 25) + 20;
  let output = '';
  for (let i = 0; i < len; i++) {
    output += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return output;
}


function onContinue() {
  bootLog.innerHTML = "";
  
  const bootLineEl = document.getElementById("boot-line");
  if (bootLineEl) bootLineEl.remove();

  bootSequence.style.display = "none";
  mainContent.style.display = "block";
  revealLinks();
}

// Trigger uplink animation on load
setTimeout(addDot, 500);