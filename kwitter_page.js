//YOUR FIREBASE LINKS

var firebaseConfig = {
    apiKey: "AIzaSyAKpASFkk84fkMBM-ymIC9Aqf8rWcr3AKg",
    authDomain: "chatterbox-58484.firebaseapp.com",
    databaseURL: "https://chatterbox-58484-default-rtdb.firebaseio.com",
    projectId: "chatterbox-58484",
    storageBucket: "chatterbox-58484.appspot.com",
    messagingSenderId: "55825783112",
    appId: "1:55825783112:web:04bc430d54ff17911b3b7d"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   user_name = localStorage.getItem("user_name");
   room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;

//Start code

console.log(firebase_message_id);
   console.log(message_data);
   Name = message_data['name'];
   Message = message_data['message'];
   Like = message_data['like'];
   Name_with_tag = "<h4>" + Name + "<img class='user_tick' src='tick.png'></h4>";
   Message_with_tag = "<h4 class='message_h4'>" + Message + "</h4>";
   Like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + Like + "onclick='updatelike(this.id)'>";
   span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : " + Like + "</span></button><hr>";
   row = Name_with_tag + Message_with_tag + Like_button + span_with_tag;
   document.getElementById("output").innerHTML += row;


//End code
    } });
});
}
getData();
function Send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name, 
          message: msg,
          like:0
    });
    document.getElementById("msg").value = "";
}

function updatelike(message_id) {
       
    console.log(message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_like = Number(likes) + 1;
    console.log(updated_like);
    firebase.database().ref(room_name).child(message_id).update({
          like : updated_like
    });

}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }