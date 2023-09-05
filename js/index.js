const url =
    "http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/product-server/products/main";

async function getProduct() {
    const productItemList = document.querySelector(".product-item-list");
    const response = await axios.get(url);
    const data = response.data.data;
    lastProductId = response.data.lastProductId;

    for (const item of data) {
        productItemList.innerHTML += `
        <li class="product-item">
            <div class="product-item-container" onclick="onClickProduct(${item.id})">
                <div class="product-img-area">
                    <img class="product-img" src="${item.image}">
                </div>
                <div class="product-info-area">
                    <div class="product-info-left-area">
                        <p class="product-title">${item.name}</p>
                    </div>
                    <div class="product-info-right-area">
                        <form action=""><button class="like-btn"><i class="xi-heart-o"></i></button></form>
                        <p class="product-price">${item.price}</p>
                    </div>
                </div>
            </div>
        </li>
        `;
    }
}

const onClickProduct = (id) => {
    localStorage.setItem("productId", id);
    window.location = "/pages/product.html";
};

// 메인으로 돌아왔을 때 productId 초기화
(function () {
    localStorage.removeItem("productId");
    localStorage.removeItem("eventId");
    getProduct();
})();
