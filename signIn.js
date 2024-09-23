import { sharedObject } from "./sharedData.js";
import { displayTopics } from "./script.js";
//global variables used by both events
const registerButton = document.getElementById("registerButton");
const signInButton = document.getElementById("signInButton");
const registerForm = document.getElementById("registerForm");
const signInForm = document.getElementById("signInForm");
const signInContainer = document.getElementById("signInContainer");
const registerContainer = document.getElementById("registerContainer");
const topicsContainer = document.getElementById("topicsContainer");
const userAccessContainer = document.getElementById("userAccessContainer");

const currentDate = new Date().toLocaleString([], {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: undefined,
});

const user = sharedObject.user;

// const setItemsVisibility = () => {
//   const allForms = document.querySelectorAll("form");
//   const allButtons = document.querySelectorAll("button");
//   allForms.forEach((item) => {
//     item.classList.remove("visible");
//     item.classList.add("hidden");
//   });
//   allButtons.forEach((item) => {
//     item.classList.remove("hidden");
//     item.classList.add("visible");
//   });
// };
// window.addEventListener("load", setItemsVisibility);

//depending if the user clicks on register or sign in, we hide or make visibile the correct form
const displayForm = (buttonName) => {
  console.log(buttonName);
  if (buttonName === "signIn") {
    signInForm.classList.remove("hidden");
    signInButton.classList.add("hidden");
    registerContainer.classList.add("hidden");
  } else if (buttonName === "register") {
    registerForm.classList.remove("hidden");
    registerButton.classList.add("hidden");
    signInContainer.classList.add("hidden");
  }
};
//listen for which button is clicked and show the right form
registerButton.addEventListener("click", () => displayForm(registerButton.name));
signInButton.addEventListener("click", () => displayForm(signInButton.name));

registerForm.addEventListener("submit", (e) => {
  //avoid reloading the page
  e.preventDefault();
  //read input values
  const newUserEmail = document.getElementById("newUserEmail").value;
  const userFirstname = document.getElementById("userFirstname").value;
  const userLastname = document.getElementById("userLastname").value;
  const userBirthday = document.getElementById("userBirthday").value;
  const newUserPassword = document.getElementById("newUserPassword").value;

  // Get the current date
  const today = new Date();
  // Subtract 18 years from today's date
  const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  // Convert the user input (userBirthday) to a Date object
  const birthDate = new Date(userBirthday);

  if (newUserEmail === "" || userFirstname === "" || newUserPassword === "" || userLastname === "" || userBirthday === "") {
    alert("Please make sure you have entered all required fields.");
    console.log(newUserEmail, userFirstname, userLastname, userPassword, userBirthday);
  } else if (newUserPassword.length < 8) {
    alert("Password must be at least 8 characters long");
  } else if (!newUserEmail.includes("@") || !newUserEmail.includes(".")) {
    alert("This email address is invalid. Please make sure to enter a valid email address. Example: 'email@example.com'");
  } else if (birthDate > minAgeDate) {
    //to get here we make a calculation against today's date to check that the user has had a birhday in the last 18 years. check line 57 for it
    alert("You must be over 18 years old to register");
  } else {
    alert(`User registered successfully. Welcome ${userFirstname}!`);
    //POST request to create the user - createUser()
    //for the userId, we set it as the insertedId (generated automatically by MongoDB)
    user.userId = ""; //insertedId - maybe we need a separate step for this one
    user.mail = newUserEmail;
    user.firstName = userFirstname;
    user.lastName = userLastname;
    user.password = newUserPassword;
    user.birthday = userBirthday;
    user.createdOn = currentDate;
    user.lastLoggedIn = currentDate;
    user.logInStatus = true;
    console.log(user);
    //when all is good, we want to hide everything with user sign in or registration, and show the topics on the page
    displayTopics(user.logInStatus);
  }
});

//if user signs in
signInForm.addEventListener("submit", (e) => {
  //avoid reloading the page
  e.preventDefault();

  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  //const user = { mail: "", firstName: "", lastName: "", birthday: "", password: "" };

  if (userEmail === "" || userPassword === "") {
    alert("Please make sure you have entered all required fields.");
  }
  //GET request to get user. findUser() to retrieve information with an email check(ideally it would be done with JWtokens - a special encripted key). if the user email exists, sign them in and retrieve the user object
  else {
    user.firstName = "Logged In user";
    user.logInStatus = true;
    user.lastLoggedIn = currentDate;
    alert(`User signed in. Welcome back ${user.firstName}!`);
    console.log(user);
    displayTopics(user.logInStatus);
  }
});
