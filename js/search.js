const currentMainCategory = [];
const moreProductBtn = document.querySelector(".more-product-btn");
const categorySearchBtn = document.querySelector(".category-search-btn");
let url = `http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/product-server/products?`;
let lastProductId;

document.querySelector(".product-item-list").innerHTML = "";

async function getProduct() {
    const productItemList = document.querySelector(".product-item-list");
    const response = await axios.get(url.slice(0, -1));
    const data = response.data.data;
    lastProductId = response.data.lastProductId;

    for (const item of data) {
        productItemList.innerHTML += `
        <li class="product-item">
            <a href="/pages/product.html">
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
            </a>
        </li>
        `;
    }
}

getProduct();

async function handleCategorySearchBtn() {
    url = `http://ec2-43-201-26-149.ap-northeast-2.compute.amazonaws.com:8000/product-server/products?`;
    const productItemList = document.querySelector(".product-item-list");
    const searchWord = document.querySelector(".search-word-input").value;
    const mainCategoryCheckboxList = document.querySelectorAll(
        ".main-category-checkbox"
    );
    const subCategoryCheckboxList = document.querySelectorAll(
        ".sub-category-checkbox"
    );

    document.querySelector(".product-item-list").innerHTML = "";

    if (searchWord !== "") {
        url += `searchword=${searchWord}&`;
    }

    for (let i = 0; i < mainCategoryCheckboxList.length; i++) {
        if (mainCategoryCheckboxList[i].checked) {
            url += `maincategory=${mainCategoryCheckboxList[i].name}&`;
        }
    }

    for (let i = 0; i < subCategoryCheckboxList.length; i++) {
        if (subCategoryCheckboxList[i].checked) {
            url += `subcategory=${subCategoryCheckboxList[i].name}&`;
        }
    }

    if (currentMainCategory.length !== 0) {
        for (let i = 0; i < currentMainCategory.length; i++) {
            url += `maincategory=${currentMainCategory[i]}&`;
        }
    }

    const response = await axios.get(url.slice(0, -1));
    const data = response.data.data;
    lastProductId = response.data.lastProductId;

    for (const item of data) {
        productItemList.innerHTML += `
        <li class="product-item">
            <a href="/pages/product.html">
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
            </a>
        </li>
        `;
    }
    console.log(url);
}

categorySearchBtn.addEventListener("click", handleCategorySearchBtn);

document.querySelector(".category-filter").addEventListener("click", (e) => {
    if (e.target.classList.contains("main-category-checkbox")) {
        if (
            e.target.parentNode.childNodes[1].className ===
            "main-category-checkbox"
        ) {
            if (e.target.parentNode.childNodes[1].checked) {
                for (
                    let i = 1;
                    i < e.target.parentNode.parentNode.children.length;
                    i++
                ) {
                    e.target.parentNode.parentNode.children[
                        i
                    ].children[0].checked = true;
                }
            }

            if (e.target.parentNode.childNodes[1].checked === false) {
                for (
                    let i = 1;
                    i < e.target.parentNode.parentNode.children.length;
                    i++
                ) {
                    e.target.parentNode.parentNode.children[
                        i
                    ].children[0].checked = false;
                }
            }
        }
    }

    if (e.target.classList.contains("sub-category-checkbox")) {
        if (
            e.target.parentNode.childNodes[1].className ===
            "sub-category-checkbox"
        ) {
            if (e.target.parentNode.children[0].checked) {
                currentMainCategory.push(
                    e.target.parentNode.parentNode.children[1].children[0].name
                );
            }

            if (e.target.parentNode.children[0].checked === false) {
                const indexOf = currentMainCategory.indexOf(
                    e.target.parentNode.parentNode.children[1].children[0].name
                );
                if (indexOf !== -1) {
                    currentMainCategory.splice(indexOf, 1);
                }
            }
        }
    }
});

moreProductBtn.addEventListener("click", handleMoreProductBtn);

async function handleMoreProductBtn() {
    const productItemList = document.querySelector(".product-item-list");
    const lastProductIdUrl = `${url}lastproductid=${lastProductId}`;

    const response = await axios.get(lastProductIdUrl);
    const data = response.data.data;
    lastProductId = response.data.lastProductId;

    for (const item of data) {
        productItemList.innerHTML += `
        <li class="product-item">
            <a href="/pages/product.html">
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
            </a>
        </li>
        `;
    }
    console.log(url);
}
