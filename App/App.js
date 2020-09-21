
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
        window.location="index.html"
      }).catch(function(error) {
        // An error happened.
      });
}
let facebookLogin=(userName)=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        sessionStorage.setItem("userName",user.displayName);
        let userName=sessionStorage.getItem('userName')
        firebase.database().ref().push(userName);
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

 let send=()=>{
  let message=document.getElementById('sms').value;
  let user = sessionStorage.getItem("userName");
  var chatObj={
    userName:user,
    chatMessasge:message
  }
  firebase.database().ref().push(chatObj);
  document.getElementById('sms').value="";
 getData()
}
let chat;
let getData=()=>{
  firebase.database().ref().once('child_added',function(data){
    chat=data.val();
    console.log(chat.chatMessasge)
  
  var ptag=document.createElement('p');
  ptag.setAttribute('class','sms');
  chatmsg=document.createTextNode(chat.chatMessasge)
  ptag.appendChild(chatmsg)
  addmsg=document.getElementById('sendersms');
  addmsg.appendChild(ptag)
  })
  
}
window.onload="getData()";
