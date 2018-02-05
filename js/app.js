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

document.addEventListener("DOMContentLoaded", function(event) {
    const db = firebase.database();
    db.ref('/').on('value', function(snapshot) {
        console.log('On value: hämtar hela databasen.');
        let data = snapshot.val();
        console.log(data);
        
        const list = document.getElementById('msg-list');
        for( let msg in data ) {
            let r = data[msg];
            //console.log(`Användare ${r.userId} egenskaper är: `, data[msg]);
            const row = document.createElement('div');
            let str = JSON.stringify(r);
            
            row.innerHTML = `
            <li class="list-group-item">
            <div class="card text-white bg-dark mb-3">
                    <div class="card-header">${r.userId} ${r.timeStamp}</div>
                    <div class="card-body bg-light text-dark">
                      
                      <p class="card-text">${r.message}</p>
                    </div>
                    <div class="card-footer">
                      <button class="btn bg-success"><i class="fa fa-thumbs-o-up mr-auto"></i>
                      </button> 
                      <button class="btn bg-danger"><i class="fa fa-thumbs-o-down mr-auto"></i>
                      </button>
                    </div>
                  </div>
                </li>
    
    `;

    list.insertBefore(row, list.childNodes[0]);
    //list.appendChild(row);
    
        }
        })
  });
class Message {
    constructor(userId, message, timeStamp){
        this.userId = userId;
        this.message = message;
        this.timeStamp = timeStamp;
    }
}
class Ui {
    addMessageToList(bird){
   
        
        const db = firebase.database();
        console.log('Adding to database...');
        db.ref('/').push(bird);
        console.log('Finished adding to database.');
 

    }

    clearFields(){
       
    }
};

// event listeners
document.getElementById('newMsgBtn').addEventListener('click', function(event){
    const userId = document.getElementById('userId').innerText,
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
  
    //window.location.href = "#refresh";
    event.preventDefault();
});
