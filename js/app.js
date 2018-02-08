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
    console.log("Author: " + newPost.userId);
    console.log("Title: " + newPost.message);
    console.log("Previous Post ID: " + prevChildKey);
    const updateList = document.getElementById('msg-list');
       
        
            console.log('ny post i db');
            let n = newPost;
            //console.log(`Användare ${r.userId} egenskaper är: `, data[msg]);
            const row = document.createElement('li');
            row.classList = "list-group-item";
            //let str = JSON.stringify(r);
            //console.log(r)
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
            const iconUp = document.createElement('i');
            iconUp.className = "fa fa-thumbs-o-up mr-auto";
            const btnD = document.createElement('button');
            btnD.className = "btn bg-danger";
            const iconDown = document.createElement('i');
            iconDown.className = "fa fa-thumbs-o-down mr-auto";
            
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
       

  
       let data = snapshot.val();
       let key = snapshot.key;
    
        const list = document.getElementById('msg-list');
       
        for( let msg in data ) {
            console.log(data[msg]);
            let r = data[msg];
            //console.log(`Användare ${r.userId} egenskaper är: `, data[msg]);
            const row = document.createElement('li');
            row.classList = "list-group-item";
            //let str = JSON.stringify(r);
            //console.log(r)
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
            const iconUp = document.createElement('i');
            iconUp.className = "fa fa-thumbs-o-up mr-auto";
            const btnD = document.createElement('button');
            btnD.className = "btn bg-danger";
            const iconDown = document.createElement('i');
            iconDown.className = "fa fa-thumbs-o-down mr-auto";
            
            divCard.appendChild(divHead);
            divBody.appendChild(pText);
            divCard.appendChild(divBody);
            btnS.appendChild(iconUp);
            btnD.appendChild(iconDown);
            divFooter.appendChild(btnS);
            divFooter.appendChild(btnD);
            divCard.appendChild(divFooter);


            row.appendChild(divCard);
            
    list.insertBefore(row, list.firstChild);
    //console.log(key);
    //console.log(list);
    //list.appendChild(row);
    
        }
        })
        getTasks();
        
  });
  
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
    constructor(userId, message, timeStamp){
        this.userId = userId;
        this.message = message;
        this.timeStamp = timeStamp;
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
        
    // instantiate Message
    let chatObject = new Message(userId, message, timeStamp);
    //console.log(chatObject);
    // instantiate ui
    const ui = new Ui();
    
    ui.addMessageToList(chatObject);
   // location.reload();

   document.getElementById('newMsg').value = "";
  
    //window.location.href = "#refresh";
    event.preventDefault();
});