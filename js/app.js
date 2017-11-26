var e_targetScrape = document.getElementsByClassName('hidden-mb package-1')[1];
var e_search = document.getElementsByClassName('search-link orb-search-link')[0];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var date = request["date"];
  var flightClass = request["flightClass"];
  console.log(date, " ", flightClass);
  if(request["scrape"]) {
    sendResponse({"data" : getData({"result": checkAvailable()});
    //window.location.reload();
  }
  else {
    openSearch();
    setDate(date);
    selectFlightClass(flightClass);
    submitForm();
    sendResponse({"date": date, "flightClass": flightClass});
  }
});

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function checkAvailable(){
  if(e_targetScrape.innerText === "Not available") return 0 //Check for not available
  if(e_targetScrape.children[0].value == "available") return 1  //Check for available
  if(e_targetScrape.children[0].value === "waitlist") return 2 // Check for waitlist
}

function setDate(date){
  document.getElementById('edit1-travel-start-day-2').value = date; //()"12/12/2017")
}

function selectFlightClass(index){
  document.getElementById('edit1-cabin-1').click();document.getElementById('customSelect-5-listbox').children[index].click(); //FOR BUSINESS
}

function openSearch(){
  e_search.click();
}

function submitForm(){
  document.getElementById('edit1-edit-search-2').click()
}

/*
while(start < end){
   console.log(start);

   var newDate = start.setDate(start.getDate() + 1);
   start = new Date(newDate);
}

document.getElementById('edit1-btn-travel-start-day-2').click() //Click on the calendar
document.getElementsByClassName('ui-datepicker-next ui-corner-all')[0].click() //Click on the calendar next button
document.getElementsByClassName('ui-datepicker-next ui-corner-all')[0].click() //Click on the calendar next button
document.getElementsByClassName('ui-datepicker-next ui-corner-all')[0].click() //Click on the calendar next button*/
