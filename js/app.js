// Initialize Firebase
var config = {
    apiKey: "AIzaSyBcBquD2te5RRMub2nfRcUYgG-JTP1FRFg",
    authDomain: "iseekyou-b0120.firebaseapp.com",
    databaseURL: "https://iseekyou-b0120.firebaseio.com",
    projectId: "iseekyou-b0120",
    storageBucket: "",
    messagingSenderId: "594608857943"
  };

firebase.initializeApp(config);

let saveUser = document.getElementById('saveUser').addEventListener('click', login);

function login(){
    let login = document.getElementById('userId').value;
    console.log(login + " is saved to storage");
    if(login === ""){
        document.getElementById('welcome').innerText = "Cant be empty... ";
      } else {
        localStorage.setItem('userId', JSON.stringify(login));
        document.getElementById('welcome').innerText = "Welcome  ";
        document.getElementById('userId').disabled = true;
        document.getElementById('saveUser').disabled = true;

      }
      location.reload();
}

let deleteUser = document.getElementById('removeUser').addEventListener('click', logout);
// Remove from LS
function logout() {
    if(localStorage.getItem('userId') === null){
      document.getElementById('removeUser').className = "btn btn-danger ml-5 disabled";
    } else {
        localStorage.removeItem('userId');
        document.getElementById('userId').value = "";
        document.getElementById('saveUser').disabled = false;
        document.getElementById('removeUser').disabled = true;
    }
    location.reload();

  }
const dbUpdate = firebase.database();
// Retrieve new posts as they are added to our database
dbUpdate.ref('/').on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    var key = snapshot.key;
    console.log("detta är " , key);
    const updateList = document.getElementById('msg-list');


            console.log('ny post i db');
            let n = newPost;
            let currentUser = document.getElementById('userId').value;
            
            const row = document.createElement('li');
            row.classList = "list-group-item";
            
            const divCard = document.createElement('div');
            divCard.className = "card text-white bg-dark mb-3";
            const divHead = document.createElement('div');
            divHead.className = "card-header";
            divHead.innerText = `${n.userId} ${n.timeStamp}`;
            const divBody = document.createElement('div');
            divBody.className = "card-body bg-light text-dark";
            const pText = document.createElement('p');
            pText.className = "card-text";
            pText.innerText = n.message;
            const divFooter = document.createElement('div');
            divFooter.className = "card-footer";
            const btnS = document.createElement('button');
            btnS.className = "btn bg-success";
            btnS.id = `like${n.timeStamp}`;
            btnS.title = "I like it!";
            btnS.addEventListener("click", function(e){
                if(currentUser === ""){
                    document.getElementById('broken').innerText = "You must be logged in to Like/Dislike";
                  }else if(n.lovers.includes(currentUser)){
                    document.getElementById('broken').innerText = `${currentUser} already liked this message`;
                  } else {
                    document.getElementById('broken').innerText = 'This function is broken';
                            
                      
                  }
            });
            const iconUp = document.createElement('i');
            iconUp.className = "fa fa-thumbs-o-up mr-auto";
            const btnD = document.createElement('button');
            btnD.className = "btn bg-danger";
            btnD.id = `dislike${n.timeStamp}`;
            btnD.title = "meeh...nothing special!";
            btnD.addEventListener("click", function(e){
                if(currentUser === ""){
                    document.getElementById('broken').innerText = "You must be logged in to Like/Dislike";
                  }else if(n.haters.includes(currentUser)){
                    document.getElementById('broken').innerText = `${currentUser} already hated this message!!`;
                  } else {
                    document.getElementById('broken').innerText = 'This function is broken';
                      
                  }
            });

            const iconDown = document.createElement('i');
            iconDown.className = "fa fa-thumbs-o-down mr-auto";
            span.id="broken";
            span.className = "ml-5";
            
            divCard.appendChild(divHead);
            divBody.appendChild(pText);
            divCard.appendChild(divBody);
            btnS.appendChild(iconUp);
            btnD.appendChild(iconDown);
            divFooter.appendChild(btnS);
            divFooter.appendChild(btnD);
            divCard.appendChild(divFooter);


            row.appendChild(divCard);

    updateList.insertBefore(row, updateList.firstChild);
  });

document.addEventListener("DOMContentLoaded", function(event) {
    const db = firebase.database();
    db.ref('/').once('value', function(snapshot) {
        console.log('On value: hämtar hela db.');
        var myNode = document.getElementById("msg-list");
        while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        }



        const data = snapshot.val();
        const key = snapshot.key;
        console.log(key);
        const list = document.getElementById('msg-list');
        let userName = document.getElementById('userId').value;
    
        for( let msg in data ) {
           
            let r = data[msg];
            const row = document.createElement('li');
            row.classList = "list-group-item";
            
            const divCard = document.createElement('div');
            divCard.className = "card text-white bg-dark mb-3";
            const divHead = document.createElement('div');
            divHead.className = "card-header";
            divHead.innerText = `${r.userId} ${r.timeStamp}`;
            const divBody = document.createElement('div');
            divBody.className = "card-body bg-light text-dark";
            const pText = document.createElement('p');
            pText.className = "card-text";
            pText.innerText = r.message;
            const divFooter = document.createElement('div');
            divFooter.className = "card-footer";
            const btnS = document.createElement('button');
            btnS.className = "btn bg-success";
            btnS.id = `like${r.timeStamp}`;
            btnS.title = "I like it!";
            btnS.addEventListener("click", function(e){
                if(userName === ""){
                    document.getElementById('broken').innerText = "You must be logged in to Like/Dislike";
                  }else if(r.lovers.includes(userName)){
                    document.getElementById('broken').innerText = `${userName} already liked this message`;
                  } else {
                    document.getElementById('broken').innerText = 'This function is broken';
                            
                      
                  }
            });
            const iconUp = document.createElement('i');
            iconUp.className = "fa fa-thumbs-o-up mr-auto";

            const btnD = document.createElement('button');
            btnD.className = "btn bg-danger";
            btnD.id = `dislike${r.timeStamp}`;
            btnD.title = "meeh...nothing special!"
            btnD.addEventListener("click", function(e){
                if(userName === ""){
                    document.getElementById('broken').innerText = "You must be logged in to Like/Dislike";
                  }else if(r.haters.includes(userName)){
                    document.getElementById('broken').innerText = `${userName} already hated this message!!`;
                  } else {
                    document.getElementById('broken').innerText = 'This function is broken';
                      
                  }
            });
            const iconDown = document.createElement('i');
            iconDown.className = "fa fa-thumbs-o-down mr-auto";
            const span = document.createElement('span');
            span.id="broken";
            span.className = "ml-5";

            divCard.appendChild(divHead);
            divBody.appendChild(pText);
            divCard.appendChild(divBody);
            btnS.appendChild(iconUp);
            btnD.appendChild(iconDown);
            divFooter.appendChild(btnS);
            divFooter.appendChild(btnD);
            divFooter.appendChild(span);
            divCard.appendChild(divFooter);

            

            row.appendChild(divCard);

    list.insertBefore(row, list.firstChild);
        }
        })
        getTasks();

  });
  function updateLike(){
    const db = firebase.database();
   
    console.log('Updating database...');
    
    console.log('Finished updating database.');
  }

  function updateDislike(){
    console.log('Update to database....')
  }

  function getTasks() {
    let userId;
    if(localStorage.getItem('userId') === null){
      document.getElementById('welcome').innerText = "Choose Chatname: ";
      document.getElementById('removeUser').disabled = true;
    } else {
      userId = JSON.parse(localStorage.getItem('userId'));
      document.getElementById('userId').value = userId;
      document.getElementById('welcome').innerText = "Welcome  ";
      document.getElementById('saveUser').className = "btn btn-success ml-5 disabled";
      document.getElementById('saveUser').disabled = true;
      document.getElementById('userId').disabled = true;

    }
}

class Message {
   constructor(userId, message, timeStamp,likeCount,lovers,dislikeCount,haters){
       this.userId = userId;
       this.message = message;
       this.timeStamp = timeStamp;
       this.likeCount = likeCount;
       this.lovers = lovers;
       this.dislikeCount = dislikeCount;
       this.haters = haters;
   }
}
class Ui {
    addMessageToList(chatObject){


        const db = firebase.database();
        console.log('Adding to database...');
        db.ref('/').push(chatObject);
        console.log('Finished adding to database.');


    }

    clearFields(){

    }
};

// event listeners
document.getElementById('newMsgBtn').addEventListener('click', function(event){
    const userId = document.getElementById('userId').value,
        message = document.getElementById('newMsg').value;
        const now = new Date()

        // Print local and timezones
        hour = now.getHours();

       minute = ('0'+now.getMinutes()).slice(-2);
        seconds = ('0'+now.getSeconds()).slice(-2);

       timeStamp = `${hour}:${minute}:${seconds}`;
       let like = 0,
                 lovers = [""],
                 dislike = 0,
                 haters = [""];

                 if(userId === "" || message === ""){
                     document.getElementById('warning').innerText = "Please fill in all fields";
                 } else {
          // instantiate Message
          let chatObject = new Message(userId, message, timeStamp, like, lovers, dislike,haters);
          //console.log(chatObject);
          // instantiate ui
          const ui = new Ui();

          ui.addMessageToList(chatObject);
         // location.reload();

         document.getElementById('newMsg').value = "";
       }

    event.preventDefault();
});

// Get the input field
var input = document.getElementById("newMsg");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("newMsgBtn").click();
  }
});
