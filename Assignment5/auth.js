//User Login//
const loginButton = document.getElementById('login-button');
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');

loginButton.onclick = function(event) {
	const promise = firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value);
	promise.catch(function(error) {
		message.textContent = error.message;
	});
};
function authState(user) {
	if (user) {
		console.log(user);
	}
}
// Auth //
const displayName = document.getElementById('username');

firebase.auth().onAuthStateChanged(function(user) {

	if (user) {
		document.body.classList.add('auth');
        
      /* Find User */
        const userRef = firebase.database().ref('users').child(user.uid);
        userRef.on('value',function(snapshot) {

            const userInfo = snapshot.val();
            displayName.textContent = "Welcome," + userInfo.displayName;
        });
 

		const profileButton = document.getElementById("edit-profile");
		profileButton.onclick = function() {
			location.href = "users.html?uid=" + user.uid;	
		};


	} else {
		document.body.classList.remove('auth');
		displayName.textContent = "";
	}
});

const logoutButton = document.getElementById("log-out");
logoutButton.onclick = function() {
	firebase.auth().signOut();
};


/* create user*/
/*
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");
const emailInput = document.getElementById("email");



const submitButton = document.getElementById("submit");

function createUser() {
	const email = emailInput.value;
	const password = passwordInput.value;
	const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
	promise.then(updateUser);

	promise.catch(function(error) {
	console.log(error);
	alert(error.message);
	});
};
submitButton.onclick = createUser;

//Create User //
	submitButton.onclick = function() {
	const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
	promise.catch(function(error) {
		errorMessage.textContent = error.message;
	});
	promise.then(function(response) {
		createUser(response.user);
	});
};
	function createUser(user) {
	const db = firebase.database();
	const ref = db.ref('users').child(user.uid);
	const promise = ref.update({
		userName: userInput.value
	});
	promise.then(function() {
		location.href = 'index.html';
	});
}

	function updateUser(credential) {
	const userInfo = {
		displayName: usernameInput.value
	};
	credential.user.updateProfile(userInfo);
};
*/

