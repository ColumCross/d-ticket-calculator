/*
 * @desc: needs to calculate stuff
 * Store data in local storage.
 * Hold a price of the cost of a D-ticket.
 * 
 * Start with just a simple function that calculates when the add button is clicked.
 */
var totalFareCost = 0;
function calculateFare() {
  const fare = parseFloat(document.getElementById("newFare").value);
  totalFareCost += fare;
  
  const elem = document.createElement("li");
  const newItem = document.createTextNode(fare + "€");
  elem.appendChild(newItem);
  document.getElementById("fareList").appendChild(elem);
  
  const newTotal = totalFareCost - parseFloat(document.getElementById("dticket").value);

  document.getElementById("totalSavings").innerHTML = newTotal + "€";
  document.getElementById("newFare").value = '';
}
