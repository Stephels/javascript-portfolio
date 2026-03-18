document
  .querySelector(".start-btn")
  .addEventListener("click", async function () {
    await startApp();
  });

document.querySelector(".return-btn").addEventListener("click", function () {
  window.location.href = "/HTML/index.html#portfolio";
});

async function startApp() {
  while (true) {
    const action = prompt(
      "Make a selection:\n\n1. Place an order\n2. View incomplete orders\n3. Exit",
    );

    if (action === null) {
      alert(`You selected: "Cancel".\n\n Operation canceled.`);
      break;
    }

    if (action === "1") {
      await placeOrder();
    } else if (action === "2") {
      manageIncompleteOrders();
    } else if (action === "3") {
      alert("See you next time ;)");
      break;
    } else {
      alert("Whoops! Invalid selection. Please try again.");
    }
  }
}

// Function to place an order
async function placeOrder() {
  // Prompt the user for the main ingredient for their meal
  let ingredient = prompt("Please enter the main ingredient for your meal:");

  // Convert the input to lowercase and replace spaces with underscores (API requirement)
  ingredient = ingredient.toLowerCase().replace(/\s+/g, "_");

  try {
    // Fetch the list of meals that match the specified ingredient from The Meal DB API
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await response.json(); // Parse the response data as JSON

    // If no meals were found for the given ingredient, prompt the user for another ingredient
    if (!data.meals) {
      alert(
        "Sorry, there are no meals found for that ingredient. Please try another one.",
      );
      return await placeOrder(); // Recursive call to ask again
    }

    // Randomly select one meal from the list of meals retrieved from the API
    const randomMeal =
      data.meals[Math.floor(Math.random() * data.meals.length)];

    // Retrieve the last generated order number from sessionStorage, or set to 0 if none exist
    const lastOrderNumber =
      JSON.parse(sessionStorage.getItem("lastOrderNumber")) || 0;

    // Generate a unique order number by incrementing the last order number
    const orderNumber = lastOrderNumber + 1;

    // Create an order object with details such as order number, description, and status
    const order = {
      orderNumber: orderNumber,
      description: randomMeal.strMeal, // Use the meal name from the API response
      status: "incomplete", // Initialize completion status as 'incomplete'
    };

    // Retrieve existing orders from sessionStorage or initialize an empty array
    const orders = JSON.parse(sessionStorage.getItem("orders")) || [];

    // Add the new order to the existing list of orders
    orders.push(order);

    // Save the updated orders list to sessionStorage
    sessionStorage.setItem("orders", JSON.stringify(orders));

    // Save the last generated order number to sessionStorage
    sessionStorage.setItem("lastOrderNumber", JSON.stringify(orderNumber));

    // Notify the user that the order has been placed successfully
    alert(
      `Order successful!\n\nOrder Number: ${order.orderNumber}\nDescription: ${order.description}`,
    );
  } catch (error) {
    // Handle any errors that occur during the API call or processing
    alert(
      "WOAH, An Error occurred while fetching meals. Let's try that again.",
    );
    console.error(error); // Log the error to the console for debugging
  }
}

// Function to manage incomplete orders
function manageIncompleteOrders() {
  // Retrieve the list of orders from sessionStorage or initialize an empty array
  const orders = JSON.parse(sessionStorage.getItem("orders")) || [];

  // Filter the orders list to retrieve only those with an 'incomplete' status
  const incompleteOrders = orders.filter(
    (order) => order.status === "incomplete",
  );

  // If there are no incomplete orders, notify the user and exit the function
  if (incompleteOrders.length === 0) {
    alert("Clean slate! No incomplete orders available.");
    return;
  }

  // Create a formatted string listing all incomplete orders for display to the user
  const orderList = incompleteOrders
    .map(
      (order) =>
        `Order Number: ${order.orderNumber}\nDescription: ${order.description}`,
    )
    .join("\n\n");

  // Prompt the user to enter an order number to mark as complete, or enter 0 to cancel
  const userResponse = prompt(
    `Incomplete Orders:\n\n${orderList}\n\nEnter an order number to mark it as complete, or 0 to cancel:`,
  );

  // If the user enters 0, no orders are marked as complete, and the function ends
  if (userResponse === "0") {
    alert("Operation Canceled. No orders marked as complete.");
    return;
  }

  // Convert the user's response to an integer representing the order number
  const orderNumber = parseInt(userResponse, 10);

  // Find the index of the order that matches the given order number
  const orderIndex = orders.findIndex(
    (order) => order.orderNumber === orderNumber,
  );

  // If the order number does not exist, notify the user and exit the function
  if (orderIndex === -1) {
    alert("Order number not found. Please try again.");
  } else {
    // Otherwise, mark the selected order as complete
    orders[orderIndex].status = "complete";

    // Save the updated list of orders back to sessionStorage
    sessionStorage.setItem("orders", JSON.stringify(orders));

    // Notify the user that the order has been marked as complete
    alert(`Order Number ${orderNumber} marked as complete.`);
  }
}

// Instruction fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const instructions = document.querySelectorAll(".instruction"); // Get all <p> elements inside the .instructions div
  let index = 0; // Start with the first <p>

  // Function to fade in the instructions one by one
  const fadeInNextInstruction = () => {
    if (index < instructions.length) {
      // Remove the 'hidden' class and add the 'show' class to reveal the instruction
      instructions[index].classList.remove("hidden");
      instructions[index].classList.add("show");

      // Move to the next instruction after 1 second
      index++;
      setTimeout(fadeInNextInstruction, 1000); // Delay between each fade-in
    }
  };

  // Start the fade-in sequence
  fadeInNextInstruction();
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 10000); // Change slides every 5 seconds
});
