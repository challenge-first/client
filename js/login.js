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

button.addEventListener("click", async () => {
  console.log("dataToSend:", dataToSend);
  axios
    .post(url, dataToSend)
    .then(async (res) => {
      const data = await res.data;
      if (res.headers.authorization) {
        localStorage.setItem("authorization", res.headers.authorization);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
