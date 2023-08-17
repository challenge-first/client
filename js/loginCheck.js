const token = localStorage.getItem("authorization");
const headerPointInfo = document.querySelector(".header-point-info");
const loginBtn = document.querySelector(".login-point-btn");

const logoutBtn = `
    <a class="login-point-btn">로그아웃</a>
`;

if (token) {
    headerPointInfo.style.display = "flex";
    loginBtn.textContent = "로그아웃";
    loginBtn.setAttribute("href", "/index.html");
    loginBtn.addEventListener("click", () => {
        localStorage.removeItem("authorization");
    });
    // loginBtn.style.display = "none";
} else {
    headerPointInfo.style.display = "none";
    loginBtn.style.display = "block";
}
