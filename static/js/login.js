//---Global Variables ---//
var inputUsername = document.querySelector('#InputUsername');
var errorMsg = document.querySelector('#ErrorMsg');
var inputUserPass = document.querySelector('#InputUserPass');
var logInForm = document.querySelector('#LogInForm');
var loginButton = document.getElementById("LoginButton");

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
    source: "login",
  }
}
// Fetch API -> POST (form.Inputs)

//--- Page Control ---//

loginButton.disabled = true;

inputUserPass.addEventListener('change', function(event) {
  validateRegistration();
})
inputUsername.addEventListener('change', function(event) {
  validateRegistration();
})

function validateRegistration() {
  data.formInputs.username = inputUsername.value;
  data.formInputs.password = inputUserPass.value;
  if (data.formInputs.username === "" || data.formInputs.password === "") {
    console.log([data.formInputs.username, data.formInputs.password]);
    loginButton.disabled = true;
    console.log("not valid");
  } else {
    console.log([data.formInputs.username, data.formInputs.password]);
    loginButton.disabled = false;

  }
}
submit();

function submit() {
  logInForm.addEventListener('submit', function(event) {
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
      if (j === "Bad User/Password Set") {
        errorMsg.classList.remove('msg-false');
        errorMsg.classList.add('msg-true');
        console.log(j)
      } else {
        errorMsg.classList.remove('msg-true');
        errorMsg.classList.add('msg-false');
        console.log('user loged in redirecting to main');
        window.location.href = "/main";

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