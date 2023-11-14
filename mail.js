 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB-2koFw2ICcMC7g4VMSgWyctgXaDHL_N0",
    authDomain: "crypto-test-5739f.firebaseapp.com",
    projectId: "crypto-test-5739f",
    storageBucket: "crypto-test-5739f.appspot.com",
    messagingSenderId: "680504108544",
    appId: "1:680504108544:web:8d4ac4ae5c6e53847adae5"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
