const API_KEY = "ebbd732f5c32dcab1754506283e2165f";

document.getElementById('add-city').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
        document.getElementById('city-input').value = '';
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCityWeather(data);
            } else {
                alert('Stadt nicht gefunden!');
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen des Wetters:', error);
        });
}

function displayCityWeather(data) {
    const cityList = document.getElementById('city-list');

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

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    cityList.appendChild(li);
}
