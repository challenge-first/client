const url =
    "http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/member-server/members/point";
const point = {
    currentPoint: 0,
    chargePoint: 0,
    afterPoint: 0,
};
const currentPoint = document.querySelector("#current-point");
const afterPoint = document.querySelector("#after-point");
const chargePoint = document.querySelector("#charge-point");

chargePoint.addEventListener("input", (e) => {
    chargePoint.value = e.target.value;

    if (e.target.value !== "") {
        afterPoint.value =
            parseInt(currentPoint.value) + parseInt(chargePoint.value);
    } else {
        afterPoint.value = parseInt(currentPoint.value);
    }
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
            const data = res.data;
            currentPoint.value = data.point;
            afterPoint.value = data.point;
        })
        .catch((err) => {
            console.log(err);
            alert("포인트 조회 실패");
            // window.location = "/index.html";
            // console.log(err);
        });
};

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
                alert("충전 완료");
                console.log(res);
                chargePoint.value = 0;
                getPoint();
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
    });

(function () {
    getPoint();
})();
