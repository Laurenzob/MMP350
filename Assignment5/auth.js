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
*/
	function updateUser(credential) {
	const userInfo = {
		displayName: usernameInput.value
	};
	credential.user.updateProfile(userInfo);
};

//User Login//
const loginButton = document.getElementById('submit');
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');

loginButton.onclick = function() {
	const email = loginEmail.value;
	const password = loginPassword.value;
	firebase.auth().signInWithEmailAndPassword(email, password);
};

function authState(user) {
	if (user) {
		console.log(user);
	}
}
firebase.auth().onAuthStateChanged(authState);

const displayName = document.getElementById('display-name');
const profileButton = document.getElementById("profile-button");


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.body.classList.add('auth');
		const userRef = firebase.database().ref('users').child(user.uid);
		userRef.once('value', function(snapshot) {
			const userInfo = snapshot.val();
			displayName.textContent = "Welcome, " + userInfo.displayName;
			profileButton.onclick = function() {
				location.href = "users.html";
			};
		});
	} else {
		document.body.classList.remove('auth');
		displayName.textContent = "";
	}
});

function authState(user) {
	if (user) {
		displayName.textContent = 'Hello, ' + user.displayName;
		document.body.classList.add('logged-in');
	} else {
		document.body.classList.remove('logged-in');
	}
}

const logoutButton = document.getElementById("log-out");
logoutButton.onclick = function() {
	firebase.auth().signOut();
};



