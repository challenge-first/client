const div = document.querySelector(".auction-detail");
const url = "http://localhost:8080/auctions";
let tempDiv = ``;



(async function () {
    try {
        const response = await axios({ method: "get", url })
        console.log(response.data.data);
        const { id, name, imageUrl, openingPrice, winningPrice, openingTime, closingTime } = response.data.data;
        const auctionId = (id) => {
            localStorage.setItem('auctionId', id);
        }
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
                <form class="auction-btn-area" action="">
                    <input id="point" type="number" placeholder="입찰 금액">
                    <button id="button" type="button">입 찰</button>
                </form>
                `
        div.innerHTML = tempDiv;
    } catch (err) {
        console.log(err);
    }
})(); 

const auctionId = localStorage.getItem("auctionId");
const postUrl = "http://localhost:8080/auctions/" + auctionId;
const bidform = document.querySelector(".auction-btn-area")

const instance = axios.create({
    baseURL: postUrl
    // timeout: 2000,
    });
    
    instance.interceptors.request.use(
    // 요청을 보내기 전 수행되는 함수
    //매개변수 이름은 config가 아니라도 됨
    function (config) {
    let accesstoken = localStorage.getItem("authorization");
    config.headers.Authorization = accesstoken;
    return config;
    },
    //오류 요청을 보내기 전 수행되는 함수
    function (error) {
    return Promise.reject(error);
    }
    );
    
    instance.interceptors.response.use(
    // 응답을 보내기 전 수행되는 함수
    function (response) {
    return response;
    },
    //오류응답을 보내기 전 수행되는 함수
    function (error) {
    return Promise.reject(error);
    }
    );

const dataToSend = {
    point:"",
    currentTime:""
};

const onPointInput = (event) => {
    dataToSend.point = event.target.value;
    console.log(dataToSend.point);
};

const onCurrentTime = (event) => {
    dataToSend.currentTime = new Date().getTime();
}

const point = document.querySelector("#point").addEventListener("input", onPointInput);
const currentTime = document.querySelector("#point").addEventListener("input", onCurrentTime);
const button = document.querySelector("#button");

button.addEventListener("click", async () => {
    console.log("dataToSend", dataToSend);
    axios
        .post(postUrl, dataToSend)
        .then(async (res) => {
            const data = await res.data;
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
});