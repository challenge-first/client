(function () {
    localStorage.setItem("eventId", 1);
})();

const url =
    "http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/event-server/events/coupon";

const button = document.querySelector(".event-btn");

button.addEventListener("click", () => {
    const requestData = {
        eventId: localStorage.getItem("eventId"),
        memberId: 1,
    };

    axios({
        method: "post",
        url: url,
        data: requestData,
        headers: {
            // Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            alert("쿠폰 발급 성공!(>o<)");
            window.location = "/index.html";
        })
        .catch((err) => {
            alert("쿠폰 발급 실패(ㅠㅁㅠ)");
            console.log(err);
        });
});
