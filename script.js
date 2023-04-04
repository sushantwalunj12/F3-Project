let title = document.querySelector(".head");
let img1 = document.querySelector(".img");
let pictureDetails = document.querySelector(".para");

let arr = [];


function getCurrentImageOfTheDay(){
    let date = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=lif0dYtK9xpLwnIBOu9WL80rFT0Pn5oeVremXK2W&date=${date}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>NASA Picture of Day: ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
    
    
}
getCurrentImageOfTheDay();

let searchDate = document.querySelector("#search-input");
let btn = document.querySelector("#search");
btn.addEventListener("click", getImageOfTheDay);

function getImageOfTheDay(){
    let newDate = searchDate.value;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=lif0dYtK9xpLwnIBOu9WL80rFT0Pn5oeVremXK2W&date=${newDate}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>Picture On ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
    
    saveSearch(newDate);
    addSearchToHistory(newDate);
}
let searchResult = document.querySelector("#search-result");


function saveSearch(newDate){
    arr.push(newDate);
    localStorage.setItem("searches", JSON.stringify(arr));
}


function addSearchToHistory(newDate){
    let searchHistory = JSON.parse(localStorage.getItem("searches"));
    
    const myHtml = searchHistory.map((item) => {
        const count = item.split("-");
        return`<li><a href="#" onclick="getUserDate(${count[0]}, ${count[1]} ,${count[2]})">${count[0]}-${count[1]}-${count[2]}</a></li>`;
    })

    searchResult.innerHTML = myHtml.join(" ");
}

function getUserDate(year, month,date){
    console.log(year,month,date);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=dmylZQirmdOEA2EO1mdEuEl3tnTjfffH9I8Ccj4Q&date=${year}-${month}-${date}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("udiwui",data);
            title.innerHTML = `<h1>Picture On ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
}