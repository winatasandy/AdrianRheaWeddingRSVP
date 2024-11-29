
// Fetch messages from Google Sheets
async function fetchMessages() {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwl9vhGpc02XgQXUkqmt7WhbFJK_VdEMdA3Ho-ZmS5expQaTIT8pM2eHTDK1uWsS6s9/exec"); // Replace with your Web App URL
    const messages = await response.json();
    return messages.map(row => ({
        name: row.name, // Replace 'Name' with the column header in your Google Sheet
        message: row.message // Replace 'Message' with the column header in your Google Sheet
    }));
}

// Display messages dynamically
let currentMessageIndex = 0;
const messageDisplay = document.getElementById('message-display');

async function showNextMessage() {
    const messagesWithNames = await fetchMessages(); // Fetch dynamic data
    if (messagesWithNames.length === 0) return; // Ensure there are messages to display

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
        const response = await fetch("https://script.google.com/macros/s/AKfycbwl9vhGpc02XgQXUkqmt7WhbFJK_VdEMdA3Ho-ZmS5expQaTIT8pM2eHTDK1uWsS6s9/exec", {
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

