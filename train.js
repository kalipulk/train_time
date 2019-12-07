$(document).ready(function () {



    let randomDate = "02/23/1999";
    let randomFormat = "MM/DD/YYYY";
    let convertedDate = moment(randomDate, randomFormat);

    //Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAknqFpThR7Zbjkwy6V5rVc2_SJgWHu8ss",
        authDomain: "traintimes-43a92.firebaseapp.com",
        databaseURL: "https://traintimes-43a92.firebaseio.com",
        projectId: "traintimes-43a92",
        storageBucket: "traintimes-43a92.appspot.com",
        messagingSenderId: "318760165639",
        appId: "1:318760165639:web:3c28a4cc45b5a1580865a2",
        measurementId: "G-1SCSHBS71F"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //   firebase.analytics();
    console.log(firebase);
    var db = firebase.database();

    $("#submit").on("click", function () {
        console.log("you got clicked");
        var newTrain = {
            name: $("#trainInput").val(),
            destination: $("#destination").val(),
            trainTime: $("#trainTime").val(),
            frequency: $("#frequency").val(),
        }
        console.log(newTrain);
        db.ref().push(newTrain);

    })

    db.ref().on("child_added", function (snapshot) {
        console.log("thing from db", snapshot.val());
        var calc = calcTime(snapshot.val());
        var tr = $("<tr>");
        var name = $("<td>").text(snapshot.val().name);
        var destination = $("<td>").text(snapshot.val().destination);
        var trainTime = $("<td>").text(snapshot.val().trainTime);
        var nextTrain = $("<td>").text(moment(calc.nextTrain).format("hh:mm"));
        var minutesRemaining = $("<td>").text(calc.minutesRemaining);

        tr.append(name, destination, trainTime, nextTrain, minutesRemaining);
        $("#trainTable").append(tr);

    })

    function calcTime(train) {
        var tFrequency = train.frequency;

        var firstTime = train.trainTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        var calculation = { nextTrain:nextTrain, minutesRemaining:tMinutesTillTrain

        }
        return calculation;
    }



})