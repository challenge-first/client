const url = "http://localhost:8080/products/main";

const ul = document.querySelector(".product-item-list");

// api 호출 후, 4개 상품 출력
const getTop4Products = async () => {
    try {
        const response = await axios({ method: "get", url });
        console.log(response.data.data);
        let templi = ``;
        response.data.data.forEach(({ id, imageUrl, name, price }) => {
            templi =
                templi +
                `
                <li class="product-item">
                    <div onclick="onClickProduct(${id})">
                        <div class="product-img-area">
                            <img
                                class="product-img"
                                src="${imageUrl}"
                            />
                        </div>
                        <div class="product-info-area">
                            <div class="product-info-left-area">
                                <p class="product-title">
                                    ${name}
                                </p>
                            </div>
                            <div class="product-info-right-area">
                                <!-- 꽉찬 하트는 i 태그 이름을 xi-heart 이걸로 하시면 됩니다. -->
                                <form action="">
                                    <button class="like-btn">
                                        <i class="xi-heart-o"></i>
                                    </button>
                                </form>
                                <p class="product-price">${price}</p>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });
        ul.innerHTML = templi;
    } catch (err) {
        console.log(err);
    }
};

const onClickProduct = (id) => {
    localStorage.setItem("productId", id);
    window.location = "/pages/product.html";
};

// 메인으로 돌아왔을 때 productId 초기화
(function () {
    localStorage.removeItem("productId");
    localStorage.removeItem("eventId");
    getTop4Products();
})();
