const postText = document.getElementById('post-text');
const publishButton = document.getElementById('publish');

publishButton.addEventListener('click', publishPost);
postText.addEventListener('keyup', function(event) {
	if (event.which == 13) {
		publishPost();
	}
});

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

const ref = firebase.database().ref('posts');

function publishPost() {
	const post = {}; // empty object
	post.text = postText.value;
	post.uid = firebase.auth().currentUser.uid;
	post.date = Date.now();
	postText.value = "";
	
	// push post to database
	ref.push(post);
}