class Search {
    constructor(id,title, location, long, lat) {
      this.id = id;
      this.title = title;
      this.location = location;
      this.long = long;
      this.lat = lat;
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

  firebase.initializeApp(firebaseConfig);

showLoading();
showResults();

function showResults(){
    var properties = [];
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/favourite').once('value').then((snapshot) => {
                snapshot.forEach(function(child) {
                    console.log(child.key+': '+child.val());
                    var title = child.val().title;
                    var location = child.val().location;
                    var long = child.val().long;
                    var lat = child.val().lat;
                    properties.push(new Search(child.key,title, location, long, lat));
                  });

                  displayList(properties)
                  hideLoading();
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
                hideLoading();
            });
        } else {
          hideLoading();
          // No user is signed in.
        }
      });
}

function displayList(properties){
      // Get the unordered list and create li elements and assign properties to it like id, onclick, child
      var ul = document.getElementById("propertyList");
      for(i = 0; i < properties.length; i++){
 
         var div = document.createElement("div");
         var lable = document.createElement("lable");
         lable.innerHTML = properties[i].title;
         lable.style.color = "black"
         lable.style.fontSize = "15px"
         var button = document.createElement("button");
         button.textContent = "Delete"
         button.style.backgroundColor = "#c6b497";
         button.style.position = "absolute";
         button.style.left = "70%"
         button.style.borderRadius = "6px"
         button.style.paddingLeft = "8px"
         button.style.paddingRight = "8px"
         button.style.paddingTop = "4px"
         button.style.paddingBottom = "4px"

         button.onclick = (function(i) {
             return function() {
                 deleteFavourite(properties[i].id)
 
         };})(i);
         div.appendChild(lable);
         div.appendChild(button);
         div.appendChild
 
          var li = document.createElement("li");
          li.appendChild(div);    
          ul.appendChild(li);
      }
}

function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}

function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}

function deleteFavourite(id){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/favourite/'+id).remove().then(() => {
              location.reload();
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
        });
        } else {
          // No user is signed in.
        }
      });
}