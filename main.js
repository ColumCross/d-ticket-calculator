/*
 * @desc: needs to calculate stuff
 * Store data in local storage.
 * Hold a price of the cost of a D-ticket.
 * 
 * Start with just a simple function that calculates when the add button is clicked.
 */
var totalFareCost = 0;
function addFare() {
  const fare = isNaN(parseFloat(document.getElementById("newFare").value)) ? 0 : parseFloat(document.getElementById("newFare").value);

  
  const elem = document.createElement("li");
  const itemText = document.getElementById("origin").value + " -> " + document.getElementById("destination").value + ": " + fare + "€ ";
  const newItem = document.createTextNode(itemText);
  elem.appendChild(newItem);

  // TODO: Add a button to remove the fare.
  const removeButton = document.createElement("button");
  removeButton.setAttribute("onClick", "removeFare(this.parentNode, "+fare+")");
  removeButton.innerHTML = "Remove Fare";
  elem.appendChild(removeButton);

  document.getElementById("fareList").appendChild(elem);
  
  calculateFare(fare);

  if(!document.getElementById("clearValues").checked) {
    document.getElementById("origin").value = '';
    document.getElementById("destination").value = '';
    document.getElementById("newFare").value = '';
  }

}
function removeFare(listElement, fare) {
  listElement.parentNode.removeChild(listElement);
  const fareToRemove = 0 - parseFloat(fare);
  calculateFare(fareToRemove);
}
function calculateFare(fare) {
  totalFareCost += fare;
  const newTotal = totalFareCost - parseFloat(document.getElementById("dticket").value);
  document.getElementById("totalSavings").innerHTML = newTotal + "€";
}
