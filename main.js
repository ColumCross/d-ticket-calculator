
var totalFareCost = 0;

/*
* Pulls the information from the input boxes and then posts a fare to the page.
* Saves the fares in localStorage.
* Clears the input boxes if needed.
*/
function addFare() {
  const fare = isNaN(parseFloat(document.getElementById("newFare").value)) ? 0 : parseFloat(document.getElementById("newFare").value);
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  postFare(origin, destination, fare);
  saveFares();

  if(!document.getElementById("clearValues").checked) {
    document.getElementById("origin").value = '';
    document.getElementById("destination").value = '';
    document.getElementById("newFare").value = '';
  }

}

// Visually removes the selected fare from the entered fares list.
function removeFare(listElement, fare) {
  listElement.parentNode.removeChild(listElement);
  const fareToRemove = 0 - parseFloat(fare);
  calculateFare(fareToRemove);
  saveFares();
}

// Generates a new fare total based on the totalFareCost and visually updates the page.
function calculateFare(fare) {
  totalFareCost += fare;
  const newTotal = totalFareCost - parseFloat(document.getElementById("dticket").value);
  document.getElementById("totalSavings").innerHTML = newTotal + "€";
}

// Visually adds a single fare to the Entered Fares section of the page.
function postFare(origin, destination, fare) {
  // Physically adds a fare to the page.
  const elem = document.createElement("li");
  const itemText = origin + " -> " + destination + ": " + fare + "€ ";
  const newItem = document.createTextNode(itemText);
  elem.appendChild(newItem);

  // TODO: Add a button to remove the fare.
  const removeButton = document.createElement("button");
  removeButton.setAttribute("onClick", "removeFare(this.parentNode, "+fare+")");
  removeButton.innerHTML = "Remove Fare";
  elem.appendChild(removeButton);

  document.getElementById("fareList").appendChild(elem);

  calculateFare(fare);
}


// Function that will run on load to pull all the fares from cookies.
// Instead of manually posting each fare one by one, the fares will be saved as a snapshot of the list and just added like that.
function loadFares() {
  document.getElementById("fareList").innerHTML = localStorage.getItem("fares");
  const storedTotalFareCost = parseFloat(localStorage.getItem("totalFareCost"));
  if(!isNaN(storedTotalFareCost)) calculateFare(storedTotalFareCost);
}

// Function that takes all the fares in the the list and saves them.
// Instead of saving each fare individually or even as a JSON object. Just save it as the html text of the list.
function saveFares() {
  // Function to manually save all the fares currently in the fare thing.
  localStorage.setItem("fares", document.getElementById("fareList").innerHTML);
  localStorage.setItem("totalFareCost", totalFareCost);
}

/*
* @name: clearData
* @desc: clears out the data from localStorage and refreshes the page.
*/
function clearData() {
  localStorage.removeItem("fares");
  localStorage.removeItem("totalFareCost");
  window.location.reload();
}
