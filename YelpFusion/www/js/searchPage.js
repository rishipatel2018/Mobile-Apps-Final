class Search {
    constructor(title, location, long, lat) {
      this.title = title;
      this.location = location;
      this.long = long;
      this.lat = lat;
    }
}

document.getElementById("buttonSearch").onclick = searchBusinessYelp;
document.getElementById("buttonFavourite").onclick = openFavourteActivity;
document.getElementById("searchLocation").value = "West Palm Beach, FL";


function openFavourteActivity(){
    window.location='favoritePage.html';
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

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
  firebase.analytics();

  function searchBusinessYelp(){

    showLoading();
    var str_term = document.getElementById("search").value;
    var str_location = document.getElementById("searchLocation").value;

    var searchFunction = firebase.functions().httpsCallable('yelpSearch');
    //For the fullName we have defined that fullName takes some data as a parameter 
    searchFunction({
     term: str_term,
     location: str_location
      }).then((result)=> {

      var data = result.data;
      var jsonData = JSON.parse(data);
      var properties = [];
  
      for(i = 0; i < jsonData.length; i++){
        var item = jsonData[i];
        var title = item.name;
        var location = item.location.display_address;
        var long = item.coordinates.longitude;
        var lat = item.coordinates.latitude;
        properties.push(new Search(title, location, long, lat));
        console.log(properties[i]);
      }

      showResults(properties)
      hideLoading();
    }).catch((error)=> {
    console.log(error);   
    hideLoading();
 })
}

function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}

function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}
  
function showResults(properties){

  var ul = document.getElementById("propertyList");
  removeAllChildNodes(ul);
  for(i = 0; i < 10; i++){

      var li = document.createElement("li");
      li.appendChild(document.createTextNode(properties[i].title));
      li.setAttribute("id", properties[i].id);

      // set onclick attribute on list item
      li.onclick = (function(i) {
          return function() {
              // To send the property object we stringify it using JSON 
              localStorage.setItem("property", JSON.stringify(properties[i]));
              window.location='itemSelectedPage.html';

      };})(i);
      ul.appendChild(li);
  }
}


