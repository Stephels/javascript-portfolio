document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar a");

  function setActiveLink() {
    let scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      // Check if the scroll position is within the current section
      if (
        scrollPosition >= sectionTop - sectionHeight / 3 &&
        scrollPosition < sectionTop + sectionHeight - sectionHeight / 3
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active"); // Remove from all links first
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active"); // Add active class to the link for the current section
          }
        });
      }
    });
  }

  // Set up the scroll event listener
  window.addEventListener("scroll", setActiveLink);
});

// HAMBURGER MENU
function toggleMenu() {
  const menuLinks = document.querySelector(".menu-links");
  menuLinks.classList.toggle("open"); // Toggle the menu open/close
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  hamburgerIcon.classList.toggle("open"); // Toggle hamburger icon animation
}

//slider buttons
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const list = document.querySelector(".list");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dots li");
let active = 0;

let refreshSlider = setInterval(() => {
  next.click();
}, 5000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
}

const sliderContainer = document.querySelector(".slider");

sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(refreshSlider); // Pause the slider
});

sliderContainer.addEventListener("mouseleave", () => {
  // Restart the slider after hovering
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
});

dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    active = key;
    reloadSlider();
  });
});

next.addEventListener("click", () => {
  active = (active + 1) % items.length; // Cycle through items
  reloadSlider();
});

prev.addEventListener("click", () => {
  active = (active - 1 + items.length) % items.length; // Cycle backwards
  reloadSlider();
});

// ---------------- Flip box on click -------------------------
function toggleFlip(box) {
  const flipBoxInner = box.querySelector(".flip-box-inner");

  // Toggle the 'flipped' class
  flipBoxInner.classList.toggle("flipped");
}

// Automatically handle clicks on all flip-box links
document.querySelectorAll(".flip-box").forEach((box) => {
  box.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    toggleFlip(this); // Toggle the flip on click
  });
});

function closePopup() {
  window.history.back(); // Navigate back to the previous page
}

function proceedToApp() {
  window.location.href = "app.html"; // Redirect to the application page
}

// Back to top | progress button
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");

  // Check the viewport width
  let screenWidth = window.innerWidth;

  // Only show the scroll button for devices wider than 768px
  if (screenWidth > 768) {
    let pos = document.documentElement.scrollTop; // Current scroll position
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight; // Total scrollable height
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
      scrollProgress.style.display = "grid"; // Show scroll progress when scrolling
    } else {
      scrollProgress.style.display = "none"; // Hide when near the top
    }

    // Ensure 'scrollValue' is valid
    if (!isNaN(scrollValue)) {
      scrollProgress.style.background = `conic-gradient(#ff5757 ${scrollValue}%, rgba(215, 215, 215, 0) ${scrollValue}%)`;
    }

    // Scroll to top when the progress button is clicked
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0; // Scroll to top on click
    });
  } else {
    // Hide progress button for devices smaller than 768px
    scrollProgress.style.display = "none";
  }
};

// Attach the scroll calculation to the window event
window.onscroll = calcScrollValue;

// Run the function on page load to ensure the progress button respects viewport size
window.onload = calcScrollValue;

// ----------------------------Skills Data ------------------------------------------------
const skillsData = {
  frontend: [
    { name: "HTML", progress: 90, img: "/Images/Skills&Tools Icons/HTML5.png" },
    { name: "CSS", progress: 80, img: "/Images/Skills&Tools Icons/CSS3.png" },
    {
      name: "JavaScript",
      progress: 75,
      img: "/Images/Skills&Tools Icons/javascript.png",
    },
    {
      name: "React",
      progress: 15,
      img: "/Images/Skills&Tools Icons/React.png",
    },
  ],
  backend: [
    {
      name: "Node.js",
      progress: 15,
      img: "/Images/Skills&Tools Icons/nodejs.png",
    },
    {
      name: "MongoDB",
      progress: 15,
      img: "/Images/Skills&Tools Icons/MongoDB.png",
    },

    {
      name: "MySQL",
      progress: 30,
      img: "/Images/Skills&Tools Icons/MySQL.png",
    },

    { name: "PHP", progress: 30, img: "/Images/Skills&Tools Icons/PHP.png" },
  ],
  webdev: [
    { name: "Git", progress: 50, img: "/Images/Skills&Tools Icons/Git.png" },
    { name: "HTML", progress: 90, img: "/Images/Skills&Tools Icons/HTML5.png" },
    { name: "CSS", progress: 80, img: "/Images/Skills&Tools Icons/CSS3.png" },
    {
      name: "JavaScript",
      progress: 75,
      img: "/Images/Skills&Tools Icons/javascript.png",
    },
    {
      name: "MongoDB",
      progress: 15,
      img: "/Images/Skills&Tools Icons/MongoDB.png",
    },
    {
      name: "Node.js",
      progress: 15,
      img: "/Images/Skills&Tools Icons/nodejs.png",
    },
    {
      name: "React",
      progress: 15,
      img: "/Images/Skills&Tools Icons/React.png",
    },
  ],
};

// Selectors
const skillButtons = document.querySelectorAll(".skill-btn");
const skillsGrid = document.getElementById("skills-grid");

// Helper function to render skill items
const renderSkills = (skills) => {
  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-item">
          <img src="${skill.img}" alt="${skill.name} Icon">
          <h4>${skill.name}</h4>
          <div class="progress-bar">
            <span style="width: ${skill.progress}%"></span>
          </div>
        </div>
      `,
    )
    .join("");
};

// Event Listeners
skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const skillType = button.getAttribute("data-skill");
    renderSkills(skillsData[skillType]);
  });
});

// Load Front-End skills on page load
renderSkills(skillsData.frontend);
