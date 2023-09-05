const getPointUrl =
    "http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/member-server/members/point";
const token = localStorage.getItem("authorization");
const headerPointInfo = document.querySelector(".header-point-info");
const loginBtn = document.querySelector(".login-point-btn");
const point = document.querySelector(".header-point");
const bidPoint = document.querySelector(".header-bid");

const logoutBtn = `
    <a class="login-point-btn">로그아웃</a>
`;

(async function () {
    if (token) {
        headerPointInfo.style.display = "flex";
        loginBtn.textContent = "로그아웃";
        loginBtn.setAttribute("href", "/index.html");
        loginBtn.addEventListener("click", () => {
            localStorage.clear();
        });
        const pointData = await axios({
            method: "get",
            url: getPointUrl,
            headers: {
                Authorization: localStorage.getItem("authorization"),
            },
        });
        console.log(pointData);
        bidPoint.textContent += pointData.data.deposit + "P";
        point.textContent += pointData.data.point + "P";
        localStorage.setItem("availablePoint", pointData.data.availablePoint);
    } else {
        headerPointInfo.style.display = "none";
        loginBtn.style.display = "block";
    }
})();
