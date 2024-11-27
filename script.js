
// Message Slider Simulation with Names and Captions
const messagesWithNames = [
    { name: "Alice", message: "Rhea adalah uhuy uhuyRhea adalah uhuy uhuyRhea adalah uhuy uhuyRhea adalah uhuy uhuyRhea adalah uhuy uhuyRhea adalah uhuy uhuyRhea adalah uhuy uhuyRhe" },
    { name: "Bob", message: "Congratulations on your big day!" },
    { name: "Charlie", message: "Wishing you a lifetime of happiness!" }
];

let currentMessageIndex = 0;
const messageDisplay = document.getElementById('message-display');


function showNextMessage() {
    // Fade out
    messageDisplay.style.opacity = 0;

    setTimeout(() => {
        // Update message after fade out
        const { name, message } = messagesWithNames[currentMessageIndex];
        messageDisplay.innerHTML = `${message}<div class="message-slider-caption">- ${name}</div>`;

        // Fade in
        messageDisplay.style.opacity = 1;

        // Update index for the next message
        currentMessageIndex = (currentMessageIndex + 1) % messagesWithNames.length;
    }, 1000); // Match with fade-out animation duration
}

// Initialize fade animation
messageDisplay.style.transition = "opacity 1s ease-in-out";
setInterval(showNextMessage, 5000); // Change message every 4 seconds 

// RSVP Form Toggle
const rsvpButton = document.getElementById('rsvp-button');
const rsvpSection = document.getElementById('rsvp');

rsvpButton.addEventListener('click', () => {
    rsvpSection.classList.remove('hidden');
    rsvpSection.scrollIntoView({ behavior: 'smooth' });
});

// RSVP Form Submission to Google Sheets
document.getElementById('rsvp-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

   try {
        // Replace 'YOUR_SCRIPT_URL' with your Apps Script Web App URL
        const response = await fetch('https://script.google.com/macros/s/AKfycbxPwsTUPGRO3X6M2wztMiuKDimJl6nl9Z2Gv-pnd8FIBNsKMTj1OQeq1O8IGip8KMDtqw/exec', {
            method: 'POST',
            body: new URLSearchParams(data),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Hey Your RSVP Submitted Successfully!');
            e.target.reset();
        } else {
            throw new Error('Oh Man, Submission failed');
        }
    } catch (error) {
        alert('Wait, There was an error submitting your RSVP.');
        console.error(error);
    }
});

//CharCounter

const messageInput = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

messageInput.addEventListener('input', () => {
    const remaining = 150 - messageInput.value.length;
    charCounter.textContent = `${remaining} characters remaining`;
});


//MusicPlayer
const backgroundMusic = document.getElementById('background-music');
const playButton = document.getElementById('play-music');
const pauseButton = document.getElementById('pause-music');

