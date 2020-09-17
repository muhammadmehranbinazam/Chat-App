let emaillogin = () =>{
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    console.log(email)
    console.log(password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result){
        console.log(result)
        window.location="chat.html";
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('message').innerHTML=errorMessage;
        document.getElementById('message').style.padding='10px';
      });email-password.html
}
let emailLogin =()=>{
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){

        window.location='chat.html'
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('message').innerHTML=errorMessage;
      });
}

let logout=()=>{
    firebase.auth().signOut().then(function() {
        window.location="login.html"
      }).catch(function(error) {
        // An error happened.
      });
}

let facebookLogin=()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        window.location='chat.html';
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
       
       document.getElementById('message').innerHTML=errorMessage;
        // ...
      });
}