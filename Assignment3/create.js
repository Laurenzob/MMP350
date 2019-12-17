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

	const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);

	promise.catch(function(error) {
	console.log(error);
	alert(error.message);
});
  	promise.then(function(credential){
      createUser(credential.user.uid);
});
function createUser(uid){
    const db = firebase.database();
    const ref = db.ref('users').child(uid);
    const promise = ref.update({
        displayName: userInput.value
    });