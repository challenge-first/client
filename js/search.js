const laptop = document.querySelector(".category-filter-laptop");
const computerParts = document.querySelector(".category-filter-computer-parts");
const submitBtn = document.querySelector(".category-search-btn");

let currentMainCategory = "LAPTOP";
let currentSubCategory = [];

if (localStorage.getItem("searchResult") !== null) {
    for (const item of JSON.parse(localStorage.getItem("searchResult"))) {
        document.querySelector(".product-item-list").innerHTML += `
        <li class="product-item">
            <a href="/pages/product.html">
                <div class="product-img-area">
                    <img class="product-img" src="${item.imageUrl}">
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
        `
    }
}

if (localStorage.getItem("searchResult") == null) {
    let url = `http://localhost:8080/products/maincategory/${currentMainCategory}`;
    
    axios.get(url)
    .then(data => {
        localStorage.setItem("searchResult", JSON.stringify(data.data.data))
        location.reload();
    })
    .catch(error => console.log(error))
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

if (localStorage.getItem("searchResult") !== null) {
    localStorage.removeItem("searchResult");
}