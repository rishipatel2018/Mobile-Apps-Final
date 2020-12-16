/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("buttonSignup").onclick = buttonSignup;
document.getElementById("buttonSignin").onclick = buttonSignin;

function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}

function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}

function  buttonSignup() {

    if(document.formSignUp.name.checkValidity()){
        if(document.formSignUp.email.checkValidity()){
            if(document.formSignUp.password.checkValidity()){
                var name = document.formSignUp.name.value;
                var email = document.formSignUp.email.value;
                var password =  document.formSignUp.password.value;
                
                showLoading();
                var ifConnected = window.navigator.onLine;
                if (ifConnected) {

                  firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCreds) => {
                  // Signed in 
                  var uid = userCreds.user.uid;
                  firebase.database().ref('users/' + uid).set({
                    username: name,
                    email: email
                  }).then(() => {
                    hideLoading()
                    window.location='page/searchPage.html';
                  }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    hideLoading()
                    console.log(error.message);
                  });
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  hideLoading()

                console.log(error.message);
                });
                } else {
                  hideLoading()

                  alert('Connection not available');
                }
            }
        }
    }
}

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function buttonSignin(email, password){
  showLoading();

    if(document.formSignIn.email.checkValidity()){
        if(document.formSignIn.password.checkValidity()){
            var email = document.formSignIn.email.value;
            var password =  document.formSignIn.password.value;
            //toggleLoading();

            var ifConnected = window.navigator.onLine;
            if (ifConnected) {
  
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in 
                // ...
                hideLoading()


                console.log("logged in");
                window.location='page/searchPage.html';


            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
                hideLoading()
            });
            } else {
              hideLoading()
              alert('Connection not available');
            }
        }
    }
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
