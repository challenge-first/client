const token = localStorage.getItem("authorization");
const productId = localStorage.getItem("productId");
const getPriceUrl = `http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/product-server/products/${productId}`;
const url = `http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/order-server/orders/products/${productId}`;
const balance_input = document.getElementById("balance_input");
const payment_btn = document.getElementById("payment_btn");
const current_input = document.getElementById("current_input");
const transaction_input = document.getElementById("transaction_input");

(async function () {
    await axios
        .get(getPriceUrl, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((response) => {
            const responseData = response.data;
            console.log("res", responseData);
            current_input.value = localStorage.getItem("availablePoint");
            transaction_input.value = responseData.data.price;
            balance_input.value = current_input.value - transaction_input.value;
            if (balance_input.value < 0) {
                alert("포인트가 부족하여 결제가 불가능합니다.");
                payment_btn.disabled = true;
                payment_btn.style.backgroundColor = "#009fce";
            }
        })
        .catch((error) => {
            console.error(error);
        });
})();

console.log(balance_input.value);
payment_btn.addEventListener("click", () => {
    const requestData = {
        price: transaction_input.value,
    };
    axios
        .post(url, requestData, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const responseData = response.data;
            alert("결제 되었습니다.");
            window.location = "/index.html";
            console.log(responseData);
        })
        .catch((error) => {
            console.error(error);
            alert("결제 실패.");
        });
});
