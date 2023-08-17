const url = "http://localhost:8080/members/point";
const point = {
    currentPoint: 0,
    chargePoint: 0,
    afterPoint: 0,
};
const currentPoint = document.querySelector("#current-point");
const afterPoint = document.querySelector("#after-point");
const chargePoint = document.querySelector("#charge-point");

chargePoint.addEventListener("input", (e) => {
    // if (e.target.value === "") {
    //     chargePoint.value = 0;
    //     console.log("zero", chargePoint.value);
    // } else {
    chargePoint.value = e.target.value;
    console.log(chargePoint.value);
    // }
    if (e.target.value !== "") {
        afterPoint.value =
            parseInt(currentPoint.value) + parseInt(chargePoint.value);
    } else {
        afterPoint.value = parseInt(currentPoint.value);
    }
});
const button = document
    .querySelector("#submit-btn")
    .addEventListener("click", () => {
        console.log(chargePoint.value);
        axios({
            method: "post",
            url: url,
            data: {
                point: chargePoint.value,
            },
            headers: {
                Authorization: localStorage.getItem("authorization"),
            },
        })
            .then((res) => {
                chargePoint.value = 0;
                getPoint();
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
    });

const getPoint = () => {
    axios({
        method: "get",
        url: url,
        headers: {
            Authorization: localStorage.getItem("authorization"),
        },
    })
        .then((res) => {
            console.log(res);
            const data = res.data.data;
            currentPoint.value = data.point;
            afterPoint.value = data.point;
        })
        .catch((err) => {
            alert("포인트 조회 실패");
            window.location = "/index.html";
            console.log(err);
        });
};

(function () {
    getPoint();
})();
