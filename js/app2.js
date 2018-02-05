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
const newRecipe = {
    namn: 'tacos',
    portioner: 1,
    ingrediens1: 'salladsmix',
    ingrediens2: {
        "mängd": '3 st',
        "ämne": 'tacoskal'
    },
    ingrediens3: 'köttfärs'
}
const db = firebase.database();
/*
// Lägga till objekt till db, används inte för tillfället
if( false ) {
    console.log('Adding to database...');
    db.ref('recept1/').push({ 'ämne': 'sylt', 'mängd': '1 msk' });
    db.ref('/recept5').set(newRecipe);
    console.log('Finished adding to database.');
    // push - lägga till nytt objekt
    // set - ändra befintliga
}*/
let provider = new firebase.auth.GithubAuthProvider();
provider.setCustomParameters({  // optional
  'allow_signup': 'true'
});
firebase.auth().getRedirectResult().then(function(result) {
    // Om vi har gjort en redirect tidigare,
    // så är result.user !== null
    if( result.user ) {
        console.log('Redirect result, success: we have a user.');
        console.log('You are logged in as ' + firebase.auth().currentUser.displayName);
        fetchFromDatabase();
    } else {
        console.log('Redirect result, user is null.');
    }
})
.catch(function(error) {
    // Inträffar om vi inte kan få information om en
    // eventuell tidigare redirect
    console.log('Redirect result, error: ' + error.message);
})
window.addEventListener('load', function() {
    // Klicka på knappen för att logga in med redirect
    document.getElementById('redirectButton').addEventListener('click', function(e) {
        firebase.auth().signInWithRedirect(provider);
    });
    document.getElementById('popupButton').addEventListener('click', function(e) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log('Popup result: logged in as ', user.displayName);
            fetchFromDatabase();
        }).catch(function(error) {
            console.log('Popup result, error: ' + error.message);
        });
    });
    document.getElementById('signoutButton').addEventListener('click', function(event) {
        firebase.auth().signOut().then(function(result) {
            console.log('Signed out user');
        })
        .catch(function(error) {
            console.log('Signout failed');
        })
    })
})  // window.load
// Gör DOM-manipulation, måste anropas inifrån webbläsarens load-händelse
function fetchFromDatabase() {
    db.ref('/').on('value', function(snapshot) {
        console.log('On value: hämtar hela databasen.');
        let data = snapshot.val();
        console.log(data);
        let divRecept = document.getElementById('recept');
        for( let recipe in data ) {
            let r = data[recipe];
            console.log(`Receptet ${r.namn} innehåller: `, data[recipe]);
            const newDiv = document.createElement('div');
            let str = JSON.stringify(r);
            newDiv.innerHTML = `<strong>${r.namn}</strong><br/>
            ${str}</br/>`;
            divRecept.appendChild(newDiv);
        }
    })
}