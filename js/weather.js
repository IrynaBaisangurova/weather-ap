
// Потрібно створити функціонал для отримання прогнозу погоди в місті.
// Використай публічне API https://www.weatherapi.com/docs/
// Використовуй ендпоінт Forecast для того, щоб отримати прогноз погоди на декілька днів.

// Створи форму в яку користувач:
// 1 вводить назву міста.
// 2 обирає на яку кількість днів він хоче отримати прогноз погоди (3, 5 та 7 днів).
// (Іноді параметр не працює в такому випадку можна зробити пошук на 1, 2 та 3 дні)
// Приклад форми https://prnt.sc/kFmLOj6gBdv-

// Після сабміту форми відмалюй картки з інформацією отриманою з бекенду.
// Картка має містити відомості про:
// 1 Зображення з погодою (icon)
// 2 Текст з погодою (text)
// 3 Дату (date)
// 4 Середню температуру в Цельсія (avgtemp_c)
// Приклад картки https://prnt.sc/h_p-A6Hty-i-

const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "5b56772b48064d3c9a2172649242811";
const form = document.querySelector(".js-search-form");
const list = document.querySelector(".js-list");

form.addEventListener("submit", handlerSearch);

function handlerSearch(event) {
  event.preventDefault();
  const{ city, days } = event.target.elements;
  // console.log(city.value);
  // console.log(days.value);
  serviceWeather(city.value, days.value)
     .then(data => {
      console.log(data);
      list.innerHTML = createMarkup(data.forecast.forecastday);
     })
     .catch(error => {
      console.log(error.message)
     })
     .finally(() => event.target.reset())

}


 function serviceWeather(city = "", days = 1) {
   const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days,
    lang: "uk",
   })
  return fetch(`${BASE_URL}/forecast.json?${params}`)
     .then(response => {
       if(!response.ok) {
         throw new Error(response.statusText);
       }
       return response.json()
     })
 }

 function createMarkup(arr) {
  return arr.map(({ date, day: { avgtemp_c, condition: {text, icon}}}) => `
    <li class="weather-card">
     <img src="${icon}" alt="${text}" class="weather-icon"/>
     <h2 class="weather-date">${date}</h2>
     <h3 class="weather-text">${text}</h3>
     <h3 class="temperature">${avgtemp_c} °C</h3>
    </li>
  `).join("");
}
