const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');

const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.userName;
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
	}
});

updateButton.onclick = function() {
	userRef.update({
		userName: profileName.value,
		bio: bioInput.value
	});
};

const submitButton = document.getElementById('submit-image');
submitButton.addEventListener('click', function() {
	// get file
	// upload file
});
const file = document.getElementById('profile-image-file').files[0];
// check file exists 
if (file) {
	// upload
}
const storage = firebase.storage();
const user = firebase.auth().currentUser;
const ref = storage.ref('users').child(user.uid).child('profile-image');
const promise = ref.put(file);

promise.then(function(image) {
	return image.ref.getDownloadURL();
}).then(function(url) {
	user.updateProfile({ url: url });
	document.getElementById('profile-image').src = url;
	document.getElementById('add-image').style.display = 'none';
	firebase.database().ref('users').child(user.uid).update({ imageURL: url });
});



