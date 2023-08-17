const laptop = document.querySelector(".category-filter-laptop");
const computerParts = document.querySelector(".category-filter-computer-parts");
const submitBtn = document.querySelector(".category-search-btn");

let currentMainCategory;
let currentSubCategory = [];

if (localStorage.getItem("searchResult") !== null) {
    for (const item of JSON.parse(localStorage.getItem("searchResult"))) {
        document.querySelector(".product-item-list").innerHTML += `
        <li class="product-item">
            <a href="/pages/product.html">
                <div class="product-img-area">
                    <img class="product-img" src="/images/product.jpg">
                </div>
                <div class="product-info-area">
                    <div class="product-info-left-area">
                        <p class="product-title">${item.name}</p>
                    </div>
                    <div class="product-info-right-area">
                        <!-- 꽉찬 하트는 i 태그 이름을 xi-heart 이걸로 하시면 됩니다. -->
                        <form action=""><button class="like-btn"><i class="xi-heart-o"></i></button></form>
                        <p class="product-price">${item.price}</p>
                    </div>
                </div>
            </a>
        </li>
        `
    }
}

laptop.addEventListener("click", () => {
    const computerPartsCheckBox = computerParts.children;
    const laptopCheckBox = laptop.children;
    currentSubCategory = [];

    for (let i = 1; i < computerPartsCheckBox.length; i++) {
        computerPartsCheckBox[i].children[0].checked = false;
    }

    for (let i = 1; i < laptopCheckBox.length; i++) {
        if (laptopCheckBox[i].children[0].checked) {
            currentSubCategory.push(laptopCheckBox[i].children[0].name)
        }
    }

    currentMainCategory = "LAPTOP";
})

computerParts.addEventListener("click", () => {
    const laptopCheckBox = laptop.children;
    const computerPartsCheckBox = computerParts.children;
    currentSubCategory = [];

    for (let i = 1; i < laptopCheckBox.length; i++) {
        laptopCheckBox[i].children[0].checked = false;
    }

    for (let i = 1; i < computerPartsCheckBox.length; i++) {
        if (computerPartsCheckBox[i].children[0].checked) {
            currentSubCategory.push(computerPartsCheckBox[i].children[0].name)
        }
    }
    
    currentMainCategory = "COMPUTER_PARTS";
})

document.querySelector(".category-filter-section").addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = `http://localhost:8080/products/maincategory/${currentMainCategory}?`;

    for (const sub of currentSubCategory) {
        url += `subcategory=${sub}&`
    }
    
    axios.get(url.slice(0, -1))
    .then(data => {
        localStorage.setItem("searchResult", JSON.stringify(data.data.data))
        location.reload();
    })
    .catch(error => console.log(error))
})

document.querySelector(".search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = `http://localhost:8080/products/maincategory/${currentMainCategory}?`;

    for (const sub of currentSubCategory) {
        url += `subcategory=${sub}&`
    }
    
    axios.get(url.slice(0, -1))
    .then(data => {
        localStorage.setItem("searchResult", JSON.stringify(data.data.data))
        location.reload();
    })
    .catch(error => console.log(error))
})