/* create user*/
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");

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
