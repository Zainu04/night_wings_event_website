/*** index.js — COMPLETE Week 9 Modal + RSVP Requirements ***/

/*** Dark Mode ***/
const themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
if (themeButton) themeButton.addEventListener("click", toggleDarkMode);

/*** Scroll Navbar Background ***/
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 250) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/*** RSVP Form Handling ***/
const rsvpButton = document.getElementById("rsvp-button");
let count = 3; // initial participants

/*** addParticipant(person) ***/
function addParticipant(person) {
  const list = document.getElementById("participants-list");
  if (!list) return;

  const newParticipant = document.createElement("li");

  // REQUIRED LINE (per instructions)
  newParticipant.textContent = `🎟️ ${person.name} will be there!`;

  list.appendChild(newParticipant);

  // Update counter text
  const countMessage = document.getElementById("rsvp-count");
  if (countMessage) {
    count += 1;
    countMessage.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  }

  // REQUIRED console log
  console.log("Successfully added a new participant!");

  // Reset form
  const form = document.getElementById("rsvp-form");
  if (form) form.reset();
}

/*** validateForm(event) ***/
function validateForm(event) {
  if (event && typeof event.preventDefault === "function") event.preventDefault();

  const name = (document.getElementById("name")?.value || "").trim();
  const hometown = (document.getElementById("hometown")?.value || "").trim();
  const state = (document.getElementById("state")?.value || "").trim();
  const email = (document.getElementById("email")?.value || "").trim();

  const person = { name, hometown, state, email };

  let containsErrors = false;
  if (person.name.length < 2) containsErrors = true;
  if (person.hometown.length < 2) containsErrors = true;
  if (!person.email.includes("@") || person.email.length < 5) containsErrors = true;

  if (containsErrors) {
    alert("Please fill in all fields correctly!");
    return false;
  }

  addParticipant(person);
  toggleModal(person);

  return true;
}

// RSVP button event listener
if (rsvpButton) {
  rsvpButton.addEventListener("click", validateForm);
}

/*** Card Fade-in Animation ***/
const cards = document.querySelectorAll(".highlight-card");
if (cards.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((card) => observer.observe(card));
}

/*** Modal Handling ***/
let rotateFactor = 0;
let intervalId = null;

const modal = document.getElementById("success-modal");
const modalText = document.getElementById("modal-text");
const modalImage = document.getElementById("modal-image");
const modalCloseBtn = document.getElementById("modal-close-btn");

// animation toggle
function animateImage() {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  if (modalImage) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    modalImage.style.transition = "transform 0.3s ease";
  }
}

// MAIN modal function
function toggleModal(person) {
  if (!modal) return;

  modal.style.display = "flex"; // show modal

  // personalized text
  if (modalText) {
    modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;
  }

  // reset image animation state
  if (modalImage) {
    modalImage.style.transform = "rotate(0deg)";
    rotateFactor = 0;
  }

  // start animation interval
  if (modalImage) {
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = setInterval(animateImage, 500);
  }

  // hide after 5 seconds
  setTimeout(() => {
    if (modal) modal.style.display = "none";
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (modalImage) modalImage.style.transform = "rotate(0deg)";
  }, 5000);
}

// Close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    if (modal) modal.style.display = "none";
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (modalImage) modalImage.style.transform = "rotate(0deg)";
  });
}
