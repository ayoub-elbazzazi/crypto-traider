 // Your web app's Firebase configuration
   const firebaseConfig = {
    apiKey: "AIzaSyDL02IHV9fVfPm5r2g5-j3KxvPjrP7pj7c",
    authDomain: "contactform-50d9f.firebaseapp.com",
    databaseURL: "https://contactform-50d9f-default-rtdb.firebaseio.com",
    projectId: "contactform-50d9f",
    storageBucket: "contactform-50d9f.appspot.com",
    messagingSenderId: "481729191146",
    appId: "1:481729191146:web:6798592b5070b2119f0b93"
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
