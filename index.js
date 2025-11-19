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

// Ensure page always loads at top
window.addEventListener('load', () => {
    // Remove any hash from URL without refreshing
    if (window.location.hash) {
      history.replaceState(null, null, ' '); // clears #about
    }
    // Scroll to top
    window.scrollTo(0, 0);
  });
  
  // Smooth scroll for Home link
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  
/*** RSVP Form Handling ***/
const rsvpButton = document.getElementById("rsvp-button");
let count = 3; // initial participants

function addParticipant(person) {
  const list = document.getElementById("participants-list");
  if (!list) return;

  const newParticipant = document.createElement("li");
  newParticipant.textContent = `🎟️ ${person.name} will be there!`;
  list.appendChild(newParticipant);

  const countMessage = document.getElementById("rsvp-count");
  if (countMessage) {
    count += 1;
    countMessage.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  }

  const form = document.getElementById("rsvp-form");
  if (form) form.reset();
}

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

if (rsvpButton) {
  rsvpButton.addEventListener("click", validateForm);
}

/*** Highlight Cards Animation on Scroll ***/
const cards = document.querySelectorAll(".highlight-card");

if (cards.length) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // triggers CSS animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // smaller threshold to trigger a little sooner

  cards.forEach(card => observer.observe(card));
}


let rotateFactor = 0;
let intervalId = null;

/*** Modal Handling ***/
const modal = document.getElementById("success-modal");
const modalText = document.getElementById("modal-text");
const modalImage = document.getElementById("modal-image");
const modalCloseBtn = document.getElementById("modal-close-btn");

function animateImage() {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  if (modalImage) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    modalImage.style.transition = "transform 0.3s ease";
  }
}

function toggleModal(person) {
  if (!modal) return;

  modal.style.display = "flex";

  if (modalText) {
    modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;
  }

  if (modalImage) {
    modalImage.style.transform = "rotate(0deg)";
    rotateFactor = 0;
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = setInterval(animateImage, 500);
  }

  setTimeout(() => {
    if (modal) modal.style.display = "none";
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (modalImage) modalImage.style.transform = "rotate(0deg)";
  }, 5000);
}

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

/*** Smooth Scroll for Navbar Links with Fixed Offset ***/
const navLinks = document.querySelectorAll(".navbar ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // prevent default jump

    const targetId = this.getAttribute("href").substring(1); // remove #
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // calculate offset (navbar height)
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});




