const token = localStorage.getItem("authorization");
const productId = localStorage.getItem('productId');
const url = `http://localhost:8080/payments/products/${productId}`;
const balance_input = document.getElementById("balance_input");
const payment_btn = document.getElementById("payment_btn");
(function() {
    
    const current_input = document.getElementById("current_input");
    const transaction_input = document.getElementById("transaction_input");

    axios.get(url, {
        headers: {
            Authorization: `${token}`
        }
    })
    .then(response => {
        const responseData = response.data;
        console.log(responseData);
        current_input.value = responseData.data.point;
        transaction_input.value = responseData.data.price;
        balance_input.value = responseData.data.currentPoint;
        if (balance_input.value < 0) {
            console.log(balance_input.value);
            payment_btn.disabled = true;
        }
    })
    .catch(error => {
        console.error(error);
    });
})();

console.log(balance_input.value);
payment_btn.addEventListener('click', () => {
    const requestData = {
        price: transaction_input.value
    };
    axios.post(url, requestData, {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const responseData = response.data;
        alert('결제 성공');
        window.location="/index.html";
        console.log(responseData);
    })
    .catch(error => {
        console.error(error);
    });
});