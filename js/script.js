import playList from "./player.js";

let cityName;
let guestName;

let audio = new Audio();
let isRuning = false;

// Обработчики кнопки player
document.querySelector(".play-prev").addEventListener("click", () => {
  let str = decodeURI(audio.src.split("/").pop());
  let index = playList.findIndex((item) => item.src.split("/").pop() == str);
  //   let temp = playList[index].src;
  audio.pause();
  if (index == -1) {
    audio.src = playList[0].src;
  } else if (index == 0) {
    index = playList.length - 1;
    audio.src = playList[playList.length - 1].src;
  } else {
    audio.src = playList[--index].src;
  }
  let items = document.querySelectorAll(".play-item");
  items.forEach((elem) => {
    elem.classList.remove("item-active");
  });
  if (index == -1) {
    index = 0;
  }
  items[index].classList.add("item-active");
  let btnPlay = document.querySelector(".play");
  btnPlay.classList.add("pause");
  isRuning = true;
  audio.play();
});

document.querySelector(".play-next").addEventListener("click", () => {
  let str = decodeURI(audio.src.split("/").pop());
  let index = playList.findIndex((item) => item.src.split("/").pop() == str);
  audio.pause();
  if (index == playList.length - 1) {
    audio.src = playList[0].src;
    index = -1;
  } else {
    audio.src = playList[index + 1].src;
  }
  let items = document.querySelectorAll(".play-item");
  items.forEach((elem) => {
    elem.classList.remove("item-active");
  });
  if (index == -1) {
    index = 0;
  } else {
    index++;
  }
  items[index].classList.add("item-active");
  let btnPlay = document.querySelector(".play");
  btnPlay.classList.add("pause");
  isRuning = true;
  audio.play();
});

document.querySelector(".play").addEventListener("click", function () {
  if (isRuning) {
    audio.pause();
    this.classList.remove("pause");
  } else {
    let str = audio.src;
    if (!str) {
      audio.src = playList[0].src;
    }
    audio.play();
    this.classList.add("pause");
  }
  isRuning = !isRuning;
});

let ulElement = document.querySelector(".play-list");
playList.forEach((item) => {
  let liElement = document.createElement("li");
  liElement.innerHTML = item.title;
  liElement.classList.add("play-item");
  ulElement.appendChild(liElement);

  liElement.addEventListener("click", (event) => {
    document.querySelectorAll(".play-item").forEach((item) => {
      item.classList.remove("item-active");
    });
    document.querySelector(".play").classList.add("pause");
    isRuning = true;
    event.target.classList.add("item-active");
    audio.pause();
    audio.preload = "auto";
    audio.src = item.src;
    audio.play();
  });
});

// Создание смены background
let prevBackgroundMain = document.querySelector(".slide-prev");
let nextBackgroundMain = document.querySelector(".slide-next");
prevBackgroundMain.addEventListener("click", prevBg);
nextBackgroundMain.addEventListener("click", nextBg);

function prevBg() {
  let str = document.body.style.backgroundImage;
  let arr = str.split("/");
  let time = arr[arr.length - 2];
  let count = parseInt(arr[arr.length - 1]);
  if (count <= 1) {
    count = 20;
  } else {
    count--;
  }
  if (count < 10) {
    count = "0" + count;
  }
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${count}.jpg')`;
}

function nextBg() {
  let str = document.body.style.backgroundImage;
  let arr = str.split("/");
  let time = arr[arr.length - 2];
  let count = parseInt(arr[arr.length - 1]);
  if (count >= 20) {
    count = 1;
  } else {
    count++;
  }
  if (count < 10) {
    count = "0" + count;
  }
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${count}.jpg')`;
}

async function setPicture(time) {
  let rand = Math.round(Math.random() * 19 + 1);
  if (rand < 10) {
    rand = "0" + rand;
  }
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${rand}.jpg')`;
}

// Отображение времени
function showTime() {
  let newDate = new Date();
  let time = document.querySelector(".time");
  time.textContent = newDate.toLocaleTimeString();
  let greeting = document.querySelector(".greeting");
  if (newDate >= "00:00:00" && newDate < "06:00:00") {
    greeting.textContent = "Good night";
  } else if (newDate >= "06:00:00" && newDate < "12:00:00") {
    greeting.textContent = "Good morning";
  } else if (newDate >= "12:00:00" && newDate < "18:00:00") {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}

function showDate() {
  let local = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = local.getDay();
  let month = local.getMonth();
  let day = local.getDate();
  let date = document.querySelector(".date");
  date.textContent = `${days[weekday]}, ${months[month]} ${day}`;
}
showDate();

function showTimeOfDay() {
  let greeting = document.querySelector(".greeting");
  if (showTime() >= "00:00:00" && showTime() < "06:00:00") {
    greeting.textContent = "Good night";
  } else if (showTime() >= "06:00:00" && showTime() < "12:00:00") {
    greeting.textContent = "Good morning";
  } else if (showTime() >= "12:00:00" && showTime() < "18:00:00") {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}
showTimeOfDay();

// получение  цитат
async function getQuotes() {
  let response = await fetch("https://type.fit/api/quotes");
  let quotes = await response.json();
  let index = Math.round(Math.random() * (quotes.length - 1));
  return quotes[index];
}
let changeQuote = document.querySelector(".change-quote");
changeQuote.addEventListener("click", async () => {
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");
  let obj = await getQuotes();
  quote.textContent = `"${obj.text}"`;
  author.textContent = obj.author;
});

document.addEventListener("DOMContentLoaded", async () => {
  // запуск таймера
  const timer = setInterval(showTime, 1000);

  let newDate = new Date();
  if (newDate >= "00:00:00" && newDate < "06:00:00") {
    setPicture("night");
  } else if (newDate >= "06:00:00" && newDate < "12:00:00") {
    setPicture("morning");
  } else if (newDate >= "12:00:00" && newDate < "18:00:00") {
    setPicture("afternoon");
  } else {
    setPicture("evening");
  }

  // обновление цитат
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");
  let obj = await getQuotes();
  quote.textContent = `"${obj.text}"`;
  author.textContent = obj.author;

  // обновление города

  // считываем данные из localstorage для города
  cityName = localStorage.getItem("city");
  console.log(cityName);
  if (cityName) {
    obj = await getWeather(cityName);
    document.querySelector(".city").value = cityName;
  } else {
    obj = await getWeather("Минск");
    document.querySelector(".city").value = "Минск";
  }

  document.querySelector(".wind").textContent = `Wind speed: ${Math.trunc(
    obj.wind.speed
  )} m/s`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humadity: ${obj.main.humidity} %`;
  document.querySelector(".temperature").textContent = `${Math.trunc(
    obj.main.temp
  )} °C`;
  document.querySelector(".weather-description").textContent =
    obj.weather.flat()[0].description;
  document.querySelector(
    ".weather-icon"
  ).innerHTML = `<img src='http://openweathermap.org/img/w/${
    obj.weather.flat()[0].icon
  }.png' alt='Icon depicting current weather.'>`;

  // получение localstorage для имени
  guestName = localStorage.getItem("guestName");
  if (guestName) {
    document.querySelector(".name").value = guestName;
  } else {
    document
      .querySelector(".name")
      .setAttribute("placeholder", "write your name");
  }
});

//Погода
async function getWeather(city) {
  localStorage.setItem("city", city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=8e161825a316f5542ed49cc61f125f91&units=metric`;
  let response = await fetch(url);
  let weather = await response.json();
  return weather;
}

let city = document.querySelector(".city");
city.addEventListener("change", async (event) => {
  let obj = await getWeather(event.target.value);
  document.querySelector(".wind").textContent = `Wind speed: ${Math.trunc(
    obj.wind.speed
  )} m/s`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humadity: ${obj.main.humidity} %`;
  document.querySelector(".temperature").textContent = `${Math.trunc(
    obj.main.temp
  )} °C`;
  document.querySelector(".weather-description").textContent =
    obj.weather.flat()[0].description;
  document.querySelector(
    ".weather-icon"
  ).innerHTML = `<img src='http://openweathermap.org/img/w/${
    obj.weather.flat()[0].icon
  }.png' alt='Icon depicting current weather.'>`;
});

// обработчик для input
document.querySelector(".name").addEventListener("change", function () {
  localStorage.setItem("guestName", this.value);
});
