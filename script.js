const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const button = document.querySelector("button");

populateUI();

let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into array
  // Map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const occupiedSeatIndex = JSON.parse(localStorage.getItem("occupiedSeats"));

  console.log(occupiedSeatIndex);

  if (occupiedSeatIndex !== null && occupiedSeatIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeatIndex.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }
}

// Confirm purchase
function buyNow() {
  if (+count.innerText !== 0) {
    seats.forEach((seat) => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      }
    });
    const purchased = document.getElementById("purchased");
    purchased.innerText = "purchased";
    button.innerText = "Purchased!";

    const occupiedSeats = document.querySelectorAll(".row .seat.occupied");

    // Copy selected seats into array
    // Map through array
    // return a new array indexes
    const occupiedSeatsIndex = [...occupiedSeats].map((seat) =>
      [...seats].indexOf(seat)
    );
    localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeatsIndex));
    localStorage.removeItem("selectedSeats");
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Buy now
button.addEventListener("click", () => {
  buyNow();
});

// initial count and total set
updateSelectedCount();
