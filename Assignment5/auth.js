/* create user*/
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");

const displayNameL = document.getElementById("user-name");
const profileButton = document.getElementById("profile-button");

const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submit");

function createUser() {
	const email = emailInput.value;
	const password = passwordInput.value;
	firebase.auth().createUserWithEmailAndPassword(email, password);
}
submitButton.onclick = createUser;

	const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
	promise.then(updateUser);

	function updateUser(credential) {
	const userInfo = {
		displayName: signupUsername.value
	};
	credential.user.updateProfile(userInfo);
}
	promise.catch(function(error) {
	console.log(error);
	alert(error.message);
});
  	promise.then(function(credential){
      createUser(credential.user.uid);
});

createButton.onclick = function() {
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

function authState(user) {
	if (user) {
		console.log(user);
	}
}
firebase.auth().onAuthStateChanged(authState);

/*Login Display*/
const displayName = document.getElementById('display-name');
function authState(user) {
	if (user) {
		displayName.textContent = 'Hello, ' + user.displayName;
		document.body.classList.add('logged-in');
	} else {
		document.body.classList.remove('logged-in');
	}
}

/*Profile Display*/
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.body.classList.add('auth');
		const userRef = firebase.database().ref('users').child(user.uid);
		userRef.once('value', function(snapshot) {
			const userInfo = snapshot.val();
			displayName.textContent = "Welcome, " + userInfo.displayName;
			profileButton.onclick = function() {
				location.href = "profile.html";
			};
		});
	} else {
		document.body.classList.remove('auth');
		displayName.textContent = "";
	}
});

/* log in */
const loginButton = document.getElementById('submit-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
loginButton.onclick = function() {
	const email = loginEmail.value;
	const password = loginPassword.value;
	firebase.auth().signInWithEmailAndPassword(email, password);
};

/* log out */
const logoutButton = document.getElementById("logout-button");
logoutButton.onclick = function() {
	firebase.auth().signOut();
};