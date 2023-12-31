const div = document.querySelector(".product-detail");
const productId = localStorage.getItem("productId");
const url =
    "http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/product-server/products/" +
    productId;
let tempDiv = ``;

(async function () {
    try {
        const response = await axios({ method: "get", url });
        console.log(response.data.data);
        const { name, image, price, productState, stockCount } =
            response.data.data;
        tempDiv = `
                <div class="product-title-area">
                    <p class = "product-title">
                        ${name}
                    </p>
                </div>
                <div class="product-img-area">
                    <img 
                        class = "product-img"
                        src="${image}"
                    />
                </div>
                <div class="product-info-area">
                    <p>
                        가격:
                        <span class="product-price">${price}</span> 원
                    </p>
                    <span class="product-content">
                    ${productState == "IN_STOCK" ? "재고 있음" : "재고 없음"}
                    </span>
                    <p>
                        재고:
                        <span class="product-stock-count">${stockCount}</span> 개
                    </p>
                </div>
                <div class="transaction-btn-area">
                    <a href="/pages/transaction.html">구 매</a>
                </div>
                `;
        div.innerHTML = tempDiv;
    } catch (err) {
        console.log(err);
    }
})();
