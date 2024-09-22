import { sharedObject } from "./sharedData.js";
const topicsContainer = document.getElementById("topicsContainer");

//GET request to retrieve topics from database - for now hard coded
const topicsArray = sharedObject.topicsArray;
const user = sharedObject.user;
//on reload check if the user is still logged in?
export const displayTopics = (userStatus) => {
  console.log(user.logInStatus);
  userStatus = user.logInStatus;
  if (userStatus === true) {
    console.log(user.logInStatus);
    topicsContainer.classList.remove("hidden");
    userAccessContainer.classList.remove("userAccessContainer");
    userAccessContainer.classList.add("hidden");
    topicsArray.forEach((topic) => {
      const topicDiv = document.createElement("div");
      const image = document.createElement("img");
      image.src = topic.image;
      image.alt = topic.title;

      const anchor = document.createElement("a");
      anchor.href = topic.topicPage;

      const button = document.createElement("button");
      button.textContent = topic.title;

      // Append the button inside the anchor
      anchor.appendChild(button);
      topicDiv.appendChild(image);
      topicDiv.appendChild(anchor);
      // Append the anchor (which wraps the button) to the topics container
      topicsContainer.appendChild(topicDiv);
    });
  } else if (userStatus === false) {
    console.log(user.logInStatus);
    topicsContainer.classList.add("hidden");
    userAccessContainer.classList.remove("hidden");
  }
};

window.addEventListener("load", displayTopics);
