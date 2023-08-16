const url = "http://localhost:8080/members/login";

const loginForm = document.querySelector(".login-form");

const dataToSend = {
  username: "",
  password: "",
};

const onIdInput = (event) => {
  dataToSend.username = event.target.value;
  console.log(dataToSend.username);
};

const onPasswordInput = (event) => {
  dataToSend.password = event.target.value;
  console.log(dataToSend.password);
};

const id = document.querySelector("#id").addEventListener("input", onIdInput);
const pwd = document
  .querySelector("#password")
  .addEventListener("input", onPasswordInput);
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  console.log("dataToSend:", dataToSend);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
