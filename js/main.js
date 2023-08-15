const laptop = document.querySelector(".category-filter-laptop");
const computerParts = document.querySelector(".category-filter-computer-parts");

laptop.addEventListener("click", () => {
    const computerPartsCheckBox = computerParts.children;
    for (let i = 1; i < computerPartsCheckBox.length; i++) {
        computerPartsCheckBox[i].children[0].checked = false;
    }
})

computerParts.addEventListener("click", () => {
    const laptopCheckBox = laptop.children;
    for (let i = 1; i < laptopCheckBox.length; i++) {
        laptopCheckBox[i].children[0].checked = false;
    }
})