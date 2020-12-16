
var firebaseConfig = {
  apiKey: "AIzaSyAZwp30h0LvczJ7yItoq2CLVSz4sM4qtE8",
  authDomain: "yelpfusion-cab83.firebaseapp.com",
  databaseURL: "https://yelpfusion-cab83-default-rtdb.firebaseio.com",
  projectId: "yelpfusion-cab83",
  storageBucket: "yelpfusion-cab83.appspot.com",
  messagingSenderId: "732877368470",
  appId: "1:732877368470:web:b98ec9201a12708a4ce6b7",
  measurementId: "G-TV8MJB5PYG"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


showSelectedItem();

document.getElementById("buttonAddFavourite").onclick = addToFavourite;
var property
function showSelectedItem()
{
    property = JSON.parse(localStorage.getItem("property"));
    document.getElementById("title").innerHTML =property.title;
    document.getElementById("location").innerHTML = property.location;
    document.getElementById("gps-location").innerHTML = property.long +" , "+ property.lat;
}

function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}

function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const latLong = { lat: property.lat, lng: property.long };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: latLong,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: latLong,
    map: map,
  });
}

function addToFavourite(){
  showLoading();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/favourite').push().set({
            title: property.title,
            location: property.location,
            long: property.long,
            lat: property.lat
            }).then(() => {
                hideLoading();
                window.history.back();
            }).catch((error) => {
                hideLoading();
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
            });
        } else {
          // No user is signed in.
          hideLoading();
        }
      });
}