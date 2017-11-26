//Global variables for you to define
var start = new Date("12/27/2017");
var end = new Date("01/10/2018");
var set = [0, 2, 3]; //Economy, Business, First

var scrape = false,
  flightClass = set[0],
  flightIndex = 0,
  startCounter = start,
  content = [],
  counter = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.status == "complete"){
    //if(start == end && ) sendToServer();
    if(tab.url.contains("https://www.singaporeair.com/booking-flow.form") && start < end){
      if(!scrape){
        setCriteriaMessage(tabId);
        scrape = true;
      }
      else{
        scrapeMessage(tabId);
        scrape = false;
        counter++;
      }
    }
  }
});

function scrapeMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: true, "date": start, "flightClass": flightClass}, function(response) {
    console.log("Scraped ", response["data"]);
    content = content.concat(response["data"]);
  });
}

function setCriteriaMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: false, "date": start, "flightClass": flightClass}, function(response) {
    if(end == startCounter && counter != 0){
      startCounter = start;
      flightIndex++;
      flightClass = set[flightIndex];
    }
    else{
      var newDate = start.setDate(start.getDate() + 1);
      startCounter = new Date(newDates);
    }
    console.log("Successfully set ",response["date"], " ", response["flightClass"]);
  });
}

function sendToServer(date, flightClass){ //TODO put this in the app.js
  console.log("CONTENT: ", content);
  (function(response) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if(xhttp.status == 200 && xhttp.readyState == 4) {
        console.log(xhttp.responseText);
      }
    }
    xhttp.send(JSON.stringify(response));
  })(content)
}
