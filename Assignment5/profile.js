const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('email');
const profilePassword = document.getElementById('profile-password');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');


userRef.on('value', function(snapshot) {
	console.log(snapshot);
	const userInfo = snapshot.val();
	profileName.value = userInfo.userName;
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
	}
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		displayEmail: profileEmail.value,
		displayPassword: profilePassword.value
	});
};

