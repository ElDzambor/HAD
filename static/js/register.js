//---Global Variables ---//
var inputUsername = document.querySelector('#InputUsername');
var errorMsg = document.querySelector('#ErrorMsg');
var inputUserPass = document.querySelector('#InputUserPass');
var inputGender = document.querySelector('#Gender');
var inputTandC = document.querySelector('#InputTandC');
var signInForm = document.querySelector('#SignInForm');
var registerButton = document.getElementById("RegisterButton");

// data storage
// note: currently just a js Object literal
// could become:
// a) a JSON storage (localStorage)
// b) data fetched from the server (from a db)
var data = {
  users: [],
  currentUser: {
    name: "test",
    pass: "passtest",
    gend: "unicorn",
  },
  formInputs: {
    username: inputUsername.value,
    password: inputUserPass.value,
    gender: inputGender.value,
    title: "empty",
    tandc: inputTandC.checked,
    source: "register",
  }
}
// Fetch API -> POST (form.Inputs)

//--- Page Control ---//
// register button disabled at the start
registerButton.disabled = true;
/* event listeners  for  username and password, gender select and TaC confirmation 
   run  validation function which checks if input fields are not empty or not selected
*/
inputTandC.addEventListener('click', function(event) {
  validateRegistration();
})
inputGender.addEventListener('change', function(event) {
  validateRegistration();
})
inputUserPass.addEventListener('change', function(event) {
  validateRegistration();
})
inputUsername.addEventListener('change', function(event) {
  validateRegistration();
})

/* submit function sends the data to the server for validation,
   retrieves response from server and acts on it
*/
submit();

// function checks if all fields fulfil registration minimum
function validateRegistration() {
  data.formInputs.username = inputUsername.value;
  data.formInputs.password = inputUserPass.value;
  data.formInputs.gender = inputGender.value;
  data.formInputs.tandc = inputTandC.checked;
  if (data.formInputs.username === "" || data.formInputs.password === "" || data.formInputs.gender === "Select" || !data.formInputs.tandc) {
    console.log([data.formInputs.username, data.formInputs.password, data.formInputs.gender, data.formInputs.tandc]);
    registerButton.disabled = true;
    console.log("not valid");
  // if all the data fulfil minimal registration requiements, additional data in form of "title" is added
  } else {
    console.log([data.formInputs.username, data.formInputs.password, data.formInputs.gender, data.formInputs.tandc]);
    if (data.formInputs.gender === "Male") {
      data.formInputs.title = "Mr"
    } else {
      if (data.formInputs.gender === "Female") {
        data.formInputs.title = "Ms"
      } else {
        if (data.formInputs.gender === "Other") {
          data.formInputs.title = "SF"
        }
      }
    }
    registerButton.disabled = false;
    console.log(data.formInputs.title);
  }
}
// submit function sends the data to the server for validation,
function submit() {
  signInForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Submit!');
    console.log('JSON input', JSON.stringify(data.formInputs))
    // submit function sends the data to the server for validation
    fetch('/form_data', {
      method: 'post',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data.formInputs)
     // depands on server response function displays error msg 
     // or redirect to main page  
    }).then(function(response) {
      console.log(response)
      return response.json()
      // j in this case is "response.json()"
    }).then(function(j) {
      console.log(j)
      if (j === "User already exists") {
        errorMsg.classList.remove('msg-false');
        errorMsg.classList.add('msg-true');
      } else {
        errorMsg.classList.remove('msg-true');
        errorMsg.classList.add('msg-false');
        console.log('user loged in redirecting to main');
        window.location.href = "https://had-undefined.codeanyapp.com/main";
      }
    }).catch(function(err) {
      console.log('err')
    });
  })
}


