(function () {
    localStorage.setItem("eventId", 1);
})();

const url =
    "http://localhost:8080/events/" +
    localStorage.getItem("eventId") +
    "/coupons";

const button = document.querySelector(".event-btn");

button.addEventListener("click", () => {
    axios
        .post(
            url,
            {},
            {
                headers: {
                    Authorization: localStorage.getItem("authorization"),
                },
            }
        )
        .then((res) => {
            alert(res.data.data.message);
            console.log(res);
            window.location = "/index.html";
        })
        .catch((err) => {
            alert("쿠폰 발급 실패");
            console.log(err);
        });
});
