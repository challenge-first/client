const url = "http://43.201.26.149:8000/member-server/members/login";

const loginForm = document.querySelector(".login-form");

const dataToSend = {
    username: "",
    password: "",
};

const onIdInput = (event) => {
    dataToSend.username = event.target.value;
};

const onPasswordInput = (event) => {
    dataToSend.password = event.target.value;
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
                localStorage.setItem(
                    "authorization",
                    res.headers.authorization
                );
            }
            document.location = "/index.html";
        })
        .catch((err) => {
            console.log(err);
        });
});
