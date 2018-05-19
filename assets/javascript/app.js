// Initialize Firebase
var config = {
    apiKey: "AIzaSyDu_ZDj2ot8LCw4YxHftUGJJLI5d6gTGZs",
    authDomain: "trainscheduler-7de0a.firebaseapp.com",
    databaseURL: "https://trainscheduler-7de0a.firebaseio.com",
    projectId: "trainscheduler-7de0a",
    storageBucket: "trainscheduler-7de0a.appspot.com",
    messagingSenderId: "525612248168"
  };
  
firebase.initializeApp(config);

var database = firebase.database();

$('body').on('click', '#add-train', function(event) {
 event.preventDefault();

  var trainName = $('#train-input').val().trim();
  var destination = $('#destination-input').val().trim();
  var trainTime = $('#time-input').val().trim();
  var frequency = $('#frequency-input').val().trim();


  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

// Appending new train to the table 

database.ref().push({
    Name: trainName,
    Destination: destination,
    Time: trainTime,
    Frequency: frequency,
    })
});

// Firebase event for adding trains to database in the table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
// console.log(childSnapshot.val());

var trainName = childSnapshot.val().Name;
var destination = childSnapshot.val().Destination;
var trainTime = childSnapshot.val().Time;
var frequency = childSnapshot.val().Frequency;

// Clear the submit form

$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");


//Put in current time to subtract from there
var currentTime = moment();
console.log(moment(currentTime).format("hh:mm"));

//Take the year away so it shows in current time
var convertedTime = moment(trainTime, "hh:mm").subtract(1, "years");
console.log(convertedTime);

//Working out the train arrival time and how many minutes away
var difference = moment().diff(moment(convertedTime), "minutes");
console.log("difference :" + difference)

//Remaining number
var remainder = difference % frequency;
var minsAway = frequency - remainder;
console.log("minsAway :" + minsAway);

//Work out when next train is coming
var nextTrain = moment().add(minsAway, "minutes");
console.log("arrival :" + moment(nextTrain).format("hh:mm"));


//Show in HTML
$("#current-time").text(moment(currentTime).format("hh:mmA"));

//Append to table ***
$("#tbody").append("<tr>");
$("#tbody").append("<td>" + trainName + "</td>");
$("#tbody").append("<td>" + destination + "</td>");
$("#tbody").append("<td>" + frequency + " minutes" + "</td>");
$("#tbody").append("<td>" + nextTrain.format("hh:mm") + "</td>")
$("#tbody").append("<td>" + minsAway + " minutes" + "</td>")
$("#tbody").append("</tr>");

});

