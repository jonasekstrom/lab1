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
        for( let bird in data ) {
            let r = data[bird];
            //console.log(`Användare ${r.userId} egenskaper är: `, data[bird]);
            const row = document.createElement('div');
            let str = JSON.stringify(r);
            
            row.innerHTML = `
            <div class="card text-white bg-dark mb-3">
                    <div class="card-header">${r.userId} ${r.timeStamp}</div>
                    <div class="card-body">
                      
                      <p class="card-text">${r.message}</p>
                    </div>
                    <div class="card-footer">
                      <button class="btn bg-success"><i class="fa fa-thumbs-o-up mr-auto"></i>
                      </button> 
                      <button class="btn bg-danger"><i class="fa fa-thumbs-o-down mr-auto"></i>
                      </button>
                    </div>
                  </div>
    
    `;
    
    list.appendChild(row);
    
        }
        })
  });
class Bird {
    constructor(userId, message, timeStamp){
        this.userId = userId;
        this.message = message;
        this.timeStamp = timeStamp;
    }
}
class Ui {
    addBirdToList(bird){
   
        
        const db = firebase.database();
        console.log('Adding to database...');
        db.ref('/').push(bird);
        console.log('Finished adding to database.');
 

    }
/*
    showAlert(message, className){
        // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#bird-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
    }
*/
   // deleteBird(target){
   //     if(target.className === 'delete'){
   //         target.parentElement.parentElement.remove();
            
   //     }
   // }

    clearFields(){
       
    }
};

// event listeners
document.getElementById('newMsgBtn').addEventListener('click', function(event){
    const userId = document.getElementById('userId').innerText,
        message = document.getElementById('newMsg').value;
        const now = new Date()

        // Print local and UTC timezones
        hour = now.getHours();
        
       minute = ('0'+now.getMinutes()).slice(-2);
        seconds = ('0'+now.getSeconds()).slice(-2);
        
       timeStamp = `${hour}:${minute}:${seconds}`;
        
    // instantiate bird
    let bird = new Bird(userId, message, timeStamp);
    //console.log(bird);
    // instantiate ui
    const ui = new Ui();
    
    ui.addBirdToList(bird);
    //validate
    /*if(userId === '' || message === ''){
        // error alert
       console.log('Var vänlig och fyll i alla fält', 'error')
    } else {
        // add bird to list
        ui.addBirdToList(bird);
        
        // show success
       console.log('Meddelande Tillagt', 'success');
        // clear fields
        ui.clearFields();
    }*/
    window.location.href = "#refresh";
    event.preventDefault();
});
/*
// event listener for delete
document.getElementById('bird-list').addEventListener('click', function(event){
   
    // instantiate ui
    const ui = new Ui();
    
    // delete bird
    ui.deleteBird(event.target);

    // show message 
    ui.showAlert('Fågel Borttagen', 'success');


    event.preventDefault();
})
*/