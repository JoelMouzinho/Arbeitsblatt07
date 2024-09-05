const API_KEY = "ebbd732f5c32dcab1754506283e2165f";

const fetchWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        if (data.cod === 200) {
            return data;
        } else {
            throw new Error('Stadt nicht gefunden!');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Wetters:', error);
        return null;
    }
};

const createWeatherElement = (data) => {
    const li = document.createElement('li');
    li.className = "bg-white p-4 rounded shadow flex justify-between items-center";
    li.innerHTML = `
        <div>
            <h2 class="text-xl font-bold">${data.name}</h2>
            <p>Aktuell: ${data.main.temp}°C</p>
            <p>Höchst: ${data.main.temp_max}°C, Tiefst: ${data.main.temp_min}°C</p>
        </div>
        <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded">Löschen</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
    return li;
};

const addCityToList = (data) => {
    const cityList = document.getElementById('city-list');
    const weatherElement = createWeatherElement(data);
    cityList.appendChild(weatherElement);
};

document.getElementById('add-city').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            addCityToList(weatherData);
        }
        document.getElementById('city-input').value = '';
    }
});
