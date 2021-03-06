/* Initialize Firebase */
var config = {
  apiKey: "AIzaSyCrs35WuR7PLQ47gusrGo4Wl3Mamlog5jo",
  authDomain: "train-scheduler-f7832.firebaseapp.com",
  databaseURL: "https://train-scheduler-f7832.firebaseio.com",
  projectId: "train-scheduler-f7832",
  storageBucket: "train-scheduler-f7832.appspot.com",
  messagingSenderId: "139077011558"
}; 7

firebase.initializeApp(config);
//Variable to refence the database
var database = firebase.database();

//Initial values
var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;

//Function calls current time
function currentTime() {
  var current = moment().format("LT");
  $("#currentTime").html(current);
  // setTimeOut(current, 1000);
};

//Adds train schedule information to the database
$(".form-field").on("keyup", function () {
  var traintemp = $("#train-name").val().trim();
  var citytemp = $("#destination").val().trim();
  var timetemp = $("#first-train").val().trim();
  var freqtemp = $("#frequency").val().trim();

  sessionStorage.setItem("train", traintemp);
  sessionStorage.setItem("city", citytemp);
  sessionStorage.setItem("time", timetemp);
  sessionStorage.setItem("freq", freqtemp);
});
//Takes item added to database and adds to page once submit is clicked
$("#train-name").val(sessionStorage.getItem("train"));
$("#destination").val(sessionStorage.getItem("city"));
$("#first-train").val(sessionStorage.getItem("time"));
$("#frequency").val(sessionStorage.getItem("freq"));

$("#submit").on("click", function (event) {
  event.preventDefault();
  //If input values are missing a alert will notify user to fill in all details
  if ($("#train-name").val().trim() === "" ||
    $("#destination").val().trim() === "" ||
    $("#first-train").val().trim() === "" ||
    $("#frequency").val().trim() === "") {

    alert("Please fill in all details to add new train");

  } else {
    //If input values are complete 
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    startTime = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    $(".form-field").val("");

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      startTime: startTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    // Clears the data saved in session storage
    sessionStorage.clear();
  }

});


database.ref().on("child_added", function (childSnapshot) {
  var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minToArrival = childSnapshot.val().frequency - timeRemain;
  var nextTrain = moment().add(minToArrival, "minutes");
  var key = childSnapshot.key;

  var newrow = $("<tr>");
  newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
  newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
  newrow.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
  newrow.append($("<td class='text-center'>" + minToArrival + "</td>"));


  if (minToArrival < 6) {
    newrow.addClass("info");
  }

  $("#train-table-rows").append(newrow);

});

$(document).on("click", ".arrival", function () {
  keyref = $(this).attr("data-key");
  database.ref().child(keyref).remove();
  window.location.reload();
});

currentTime();
console.log(currentTime);

setInterval(function () {
  window.location.reload();
}, 60000);