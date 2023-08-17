const div = document.querySelector(".auction-info");
const url = "http://localhost:8080/auctions";
let tempDiv = ``;
let auctionId;
let buttonElement;
let pointElement;

const getAuction = async () => {
    try {
        const response = await axios({
            method: "get",
            url: url,
            headers: {
                Authorization: localStorage.getItem("authorization"),
            },
        });
        console.log(response.data.data);
        const {
            id,
            name,
            imageUrl,
            openingPrice,
            winningPrice,
            openingTime,
            closingTime,
        } = response.data.data;
        localStorage.setItem("auctionId", id);

        tempDiv = `
                <div class="auction-title-area">
                    <p class = "auction-title">
                    ${name}
                    </p>
                </div>
                <div class="auction-img-area">
                    <img
                        class = "auction-img" 
                        src="${imageUrl}">
                </div>
                <div class="auction-info-area">
                    <p class="opening-price">시작 가격: <span class="auction-start-price">${openingPrice}</span> 원</p>
                    <p class="current-price">현재 가격: <span class="auction-current-price">${winningPrice}</span> 원</p>
                    <p class="opening-time">시작 시간: <span class="auction-start-time">${openingTime}</span></p>
                    <p class="closing-time">마감 시간: <span class="auction-end-time">${closingTime}</span></p>
                </div>
                `;
        div.innerHTML = tempDiv;
    } catch (err) {
        console.log(err);
    }
};
const buttonForm = () => {
    let tempForm = `
                <form class="auction-btn-area" action="">
                    <input id="point" type="number" placeholder="입찰 금액">
                    <button id="button" class="bid-button" type="button">입 찰</button>
                </form>
                `;
};

const bid = () => {
    const dataToSend = {
        point: "",
        time: "",
    };

    auctionId = localStorage.getItem("auctionId");
    const postUrl = "http://localhost:8080/auctions/" + auctionId;

    const onPointInput = (event) => {
        dataToSend.point = event.target.value;
        dataToSend.time = new Date().toISOString();
    };

    buttonElement = document.querySelector("#button");
    pointElement = document
        .querySelector("#point")
        .addEventListener("input", onPointInput);

    buttonElement.addEventListener("click", () => {
        axios({
            method: "post",
            url: postUrl,
            data: dataToSend,
            headers: {
                Authorization: localStorage.getItem("authorization"),
            },
        })
            .then((res) => {
                const data = res.data;
                alert("입찰성공");
                console.log(data);
            })
            .catch((err) => {
                alert("에러");
                console.log(err);
            });
    });
};

(async function () {
    await getAuction();
    bid();
    setInterval(async () => {
        await getAuction();
    }, 20000);
})();
