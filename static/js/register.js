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

registerButton.disabled = true;
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

function validateRegistration() {
  data.formInputs.username = inputUsername.value;
  data.formInputs.password = inputUserPass.value;
  data.formInputs.gender = inputGender.value;
  data.formInputs.tandc = inputTandC.checked;
  if (data.formInputs.username === "" || data.formInputs.password === "" || data.formInputs.gender === "Select" || !data.formInputs.tandc) {
    console.log([data.formInputs.username, data.formInputs.password, data.formInputs.gender, data.formInputs.tandc]);
    registerButton.disabled = true;
    console.log("not valid");
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
submit();

function submit() {
  signInForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Submit!');
    console.log('JSON input', JSON.stringify(data.formInputs))
    fetch('/form_data', {
      method: 'post',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data.formInputs)
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
        window.location.href = "https://the-joke-.codeanyapp.com/main";
      }
    }).catch(function(err) {
      console.log('err')
    });
  })
}


/*function validateRegistration(username, password, gender, tandc) {
  // validation
  if (username === "" || password === "" || gender === "Select" || !tandc) {
    console.log("not valid");
    //  errorMsg.classList.remove('hidden');
    //  successMsg.classList.add('hidden');
  } else {
    var user = users.find(function(u) {
      return u.name === username;
    })
    if (user == undefined) {
      var newUser = {
        name: username,
        pass: password,
        gend: gender
      }
      var currentUser = {
        name: username,
        gend: gender
      }
      currentUser.name = newUser.name;
      currentUser.gend = newUser.gend;
      users.push(newUser);
      loggedInUserInfo.innerHTML = `Hi ${currentUser.name}`;
      console.log("userslist:", users, "current user:", currentUser.name);
      GoToSummary();
    } else {
      console.log("username taken");
    }
  }
}*/