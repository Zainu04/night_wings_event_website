/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
 let themeButton = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode")
    // This section will run whenever the button is clicked
}
// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ******/


window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 250) {       // adjust 50 for when background should appear
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// Step 1: Add your query for the submit RSVP button here

const rsvpButton = document.getElementById("rsvp-button");

let count = 3; // initial participants

const addParticipant = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const state = document.getElementById("state").value;

    const newParticipant = document.createElement("li");
    newParticipant.textContent = `${name} from ${state} has RSVP'd.`;

    const participantsList = document.getElementById("participants-list");
    participantsList.appendChild(newParticipant);

    newParticipant.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;

    // Increment count and update message
    count += 1;
    const countMessage = document.getElementById("rsvp-count");
    countMessage.textContent = `⭐ ${count} people have RSVP'd to this event!`;

    document.getElementById("rsvp-form").reset();
}


// Step 3: Add click event listener to the button











const validateForm = (event) => {
    event.preventDefault(); // prevent default form submission
    
    let containsErrors = false;
    const rsvpInputs = document.getElementById("rsvp-form").elements;

    // Loop through all inputs
    for (let i = 0; i < rsvpInputs.length; i++) {
        const input = rsvpInputs[i];

        // Skip the button
        if (input.type === "button" || input.type === "submit") continue;

        // Check length
        if (input.value.trim().length < 2) {
            containsErrors = true;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    const emailInput = document.getElementById("email");
    if (!emailInput.value.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error");
    } else if (emailInput.value.length >= 2) {
        // remove error if valid
        emailInput.classList.remove("error");
    }

    // If no errors, add participant and clear inputs
    if (!containsErrors) {
        addParticipant(event);
    }
};


rsvpButton.addEventListener("click", validateForm);

// Animate cards when they come into view
const cards = document.querySelectorAll('.highlight-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));




/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/

