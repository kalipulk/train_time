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
  firebase.analytics();